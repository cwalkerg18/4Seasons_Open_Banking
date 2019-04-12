using System;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Linq;
using SalesViewer.Models;
using System.IO;

namespace SalesViewer {

    public class DemoDataGenerator {

        private static readonly List<string> Channels = Data.Channels;
        private static readonly List<string> Regions = Data.Regions;
        private static readonly List<string> Sectors = Data.Sectors;
        private static readonly List<Region> RegionsWithCities = Data.RegionsWithCities;

        private static readonly List<Company> Companies = Data.Companies;

        private static readonly List<Product> Products = Data.Products;

        public static bool IsGenerationNeed(string fileName) {
            return !File.Exists(fileName);
        }

        public static void CreateDataFolder(string fileName) {
            Directory.CreateDirectory(Path.GetDirectoryName(fileName));
        }

        public static void Generate(string fileName)
        {
            if(IsGenerationNeed(fileName)) {
                CreateDataFolder(fileName);

                var doc = new XDocument();
                var sales = new XElement("Sales");

                SeedSales(sales);

                doc.Add(sales);
                doc.Save(fileName);
            }
        }

        private static void SeedSales(XContainer storage)
        {
            var today = DateTime.Today;
            var startDate = new DateTime(today.AddYears(-2).Year, 1, 1, 8, 0, 0);
            var endDate = new DateTime(today.Year, 12, 31, 17, 0, 0);
            var curDate = startDate;
            var list = new List<Sale>();
            var rnd = new Random(Environment.TickCount);

            var sectorsWeights = new int[] {5, 3, 3, 2, 1, 1};
            var productsWeights = new int[] {12, 20, 17, 23, 15, 13};
            var regionsWeights = new int[] {12, 2, 7, 4, 5, 1};
            var channelsWeights = new int[] {5, 2, 2, 3, 4};
            var citiesWeights = new int[] { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 6, 9, 8, 7, 6 };
            var companiesWeights = new int[] { 5, 3, 2, 4, 5, 3, 2, 4, 5, 3, 2, 4, 5, 3, 2, 4, 5, 3, 2, 4, 5, 3 };

            var minSalesCurveParams1 = InitSaleCurveFunction(2, 4, 5, 0.7);
            var maxSalesCurveParams1 = InitSaleCurveFunction(6, 8, 11, 0.7);

            var minSalesCurveParams2 = InitSaleCurveFunction(3, 6, 7, 0.7);
            var maxSalesCurveParams2 = InitSaleCurveFunction(6, 9, 12, 0.7);

            var minSalesCurveParams3 = InitSaleCurveFunction(2, 5, 6, 0.8);
            var maxSalesCurveParams3 = InitSaleCurveFunction(5, 9, 13, 0.8);

            while (curDate <= endDate)
            {
                if (curDate.Hour < 8 || curDate.Hour > 17 || (curDate.Hour == 17 && curDate.Minute != 0))
                {
                    curDate = curDate.AddMinutes(15);
                    continue;
                }
                var minSalesCurveParams = (curDate.Day < 10)
                                              ? minSalesCurveParams1
                                              : ((curDate.Day < 20) ? minSalesCurveParams2 : minSalesCurveParams3);
                var maxSalesCurveParams = (curDate.Day < 10)
                                              ? maxSalesCurveParams1
                                              : ((curDate.Day < 20) ? maxSalesCurveParams2 : maxSalesCurveParams3);
                var minSalesCount = CalculateSalesCount(minSalesCurveParams, curDate);
                var maxSalesCount = CalculateSalesCount(maxSalesCurveParams, curDate);

                var salesCount = rnd.Next(minSalesCount, maxSalesCount);
                for (var i = 0; i < salesCount; i++)
                {
                    var prodId = GetRankRandom(rnd, getWeightsFromMonth(curDate.Month % 3, 6));
                    int regionId = GetRankRandom(rnd, regionsWeights);
                    int cityId = GetRankRandom(rnd, citiesWeights.Take(RegionsWithCities[regionId].cities.Count).ToArray());
                    int companyIdentifier = GetRankRandom(rnd, companiesWeights.Take(Companies.Count).ToArray()) + 1;
                    int channelId = GetRankRandom(rnd, getWeightsFromMonth(curDate.Month, 5));
                    int sectorId = GetRankRandom(rnd, getWeightsFromMonth(curDate.Month + 2, 6));
                    var sale = new Sale {
                        SaleDate = curDate,
                        Region = RegionsWithCities[regionId].region,

                        Channel = Channels[channelId],
                        Sector = Sectors[sectorId],
                        Units = rnd.Next(1, 5),
                        Discount = rnd.Next(5,75) * 10,

                        product = new Product { id = prodId + 1 },
                        city = new City { id = RegionsWithCities[regionId].cities[cityId].id },
                        company = new Company { id = companyIdentifier }
                    };
                    sale.TotalCost = sale.Units*Products[prodId].listPrice - sale.Discount;

                    list.Add(sale);
                }
                curDate = curDate.AddMinutes(15);
            }

            foreach (var region in RegionsWithCities) { 
                foreach (var city in region.cities){
                    storage.Add(new XElement("City",
                                             new XAttribute("id", city.id),
                                             new XAttribute("name", city.name),
                                             new XAttribute("lat", city.latitude),
                                             new XAttribute("lng", city.longtitude),
                                             new XAttribute("country", city.country),
                                             new XAttribute("state", city.state),
                                             new XAttribute("map", city.map)
                                             ));
                }
            }

            foreach (var company in Companies) {
                storage.Add(new XElement("Company",
                                            new XAttribute("id", company.id),
                                            new XAttribute("name", company.name),
                                            new XAttribute("address", company.address),
                                            new XAttribute("city", company.city),
                                            new XAttribute("state", company.state),
                                            new XAttribute("postalCode", company.postalCode),
                                            new XAttribute("fax", company.fax),
                                            new XAttribute("phone", company.phone)
                                            ));          
            }

            foreach (var product in Products) {
                storage.Add(new XElement("Product",
                                            new XAttribute("id", product.id),
                                            new XAttribute("name", product.name),
                                            new XAttribute("description", product.description),
                                            new XAttribute("baseCost", product.baseCost),
                                            new XAttribute("listPrice", product.listPrice),
                                            new XAttribute("unitsInInventory", product.unitsInInventory),
                                            new XAttribute("unitsInManufactoring", product.unitsInManufactoring),
                                            new XAttribute("plant", product.plant),
                                            new XAttribute("sManager", product.sManager),
                                            new XAttribute("pManager", product.pManager)
                                            ));
            }

            foreach (var item in list)
            {
                storage.Add(new XElement("Sale",
                                         new XAttribute("Units", item.Units),
                                         new XAttribute("Discount", item.Discount),
                                         new XAttribute("TotalCost", item.TotalCost),
                                         new XAttribute("SaleDate", item.SaleDate),
                                         new XAttribute("Product", item.product.id),
                                         new XAttribute("Region", item.Region),
                                         new XAttribute("City", item.city.id),
                                         new XAttribute("companyId", item.company.id),
                                         new XAttribute("Channel", item.Channel),
                                         new XAttribute("Sector", item.Sector)));
            }
        }

        private static int CalculateSalesCount(IList<double> parameters, DateTime x) {
            var xx = (double)(x.Hour * 60 + x.Minute - 480) / 540.0;
            return (int)Math.Round(parameters[0] * Math.Pow(xx, 6) + parameters[1] * Math.Pow(xx, 4) + parameters[2] * Math.Pow(xx, 2) + parameters[3]);
        }

        private static double[] InitSaleCurveFunction(int a, int b, int c, double p) {
            double t;
            var r1 = new int[] { 1, 1, 1, b - a };

            double s = t = p * p;
            var r2 = new double[] { t, t *= s, t *= s, c - a };
            t = p;
            var r3 = new double[] { 2 * t, 4 * (t *= s), 6 * (t *= s), 0 };

            t = r2[0] / r1[0];
            r2 = new double[] { 0, r2[1] - t * r1[1], r2[2] - t * r1[2], r2[3] - t * r1[3] };
            t = r3[0] / r1[0];
            r3 = new double[] { 0, r3[1] - t * r1[1], r3[2] - t * r1[2], r3[3] - t * r1[3] };
            t = r3[1] / r2[1];
            r3 = new double[] { 0, 0, r3[2] - t * r2[2], r3[3] - t * r2[2] };

            var res = new double[4] { r3[3] / r3[2], 0, 0, 0 };
            res[1] = (r2[3] - r2[2] * res[0]) / r2[1];
            res[2] = (r1[3] - r1[2] * res[0] - r1[1] * res[1]) / r1[0];
            res[3] = a;

            return res;
        }

        private static int GetRankRandom(Random rnd, int[] weights) {
            var coords = new int[weights.Length];
            var summ = 0;
            for (var i = 0; i < weights.Length; i++) {
                summ += weights[i];
                coords[i] = summ;
            }

            var next = rnd.Next(summ);

            for (var i = 0; i < coords.Length; i++) {
                if (next < coords[i])
                    return i;
            }
            throw new InvalidOperationException();
        }

        private static int[] getWeightsFromMonth(int monthOfYear, int weightsNumber) {
            int[] weights = new int[weightsNumber];
            for (int i = 0; i < weightsNumber; i++) {
                weights[i] = (int)Math.Pow(((Math.Sin(monthOfYear / 2 - i/ 3.14))*7),2) + 1;
            }
            return weights;
        }
    }
}