using SalesViewer.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace SalesViewer.Models {
    public class SalesRepository : ISalesRepository {
        private readonly List<Sale> _sales;
        private readonly Dictionary<int, City> _cities;
        private readonly Dictionary<int, Company> _companies;
        private readonly Dictionary<int, Product> _products;

        private SalesRepository() {
            XDocument doc = XDocument.Load(HttpContext.Current.Server.MapPath("~/App_Data/SalesDashboardData.xml"));

            _companies = Data.Companies.ToDictionary(item => item.id, item => item);
            _products = Data.Products.ToDictionary(item => item.id, item => item);
            _cities = (from region in Data.RegionsWithCities
                       from city in region.cities
                       select city).ToDictionary(item => item.id, item => item);

            _sales = (from t in doc.Root.Elements("Sale")
                      orderby t.Attribute("SaleDate").Value

                      select new Sale {
                          Units = int.Parse(t.Attribute("Units").Value),
                          Discount = decimal.Parse(t.Attribute("Discount").Value),
                          TotalCost = decimal.Parse(t.Attribute("TotalCost").Value),
                          SaleDate = DateTime.Parse(t.Attribute("SaleDate").Value),
                          Region = t.Attribute("Region").Value,
                          Channel = t.Attribute("Channel").Value,
                          Sector = t.Attribute("Sector").Value,

                          product = _products[int.Parse(t.Attribute("Product").Value)],
                          city = _cities[int.Parse(t.Attribute("City").Value)],
                          company = _companies[int.Parse(t.Attribute("companyId").Value)]

                      }).ToList();
        }

        private static SalesRepository _instance;

        private static Object _lock = new Object();

        public static SalesRepository Instance {
            get {
                if(_instance == null)
                    lock (_lock) 
                        return _instance ?? (_instance = new SalesRepository());
                else 
                    return _instance;
                
                
            }
        }

        public IEnumerable<Sale> GetSales() {
            return _sales;
        }

        public IEnumerable<Company> GetCompanies() {
            return _companies.Values.ToList();
        }

        public IEnumerable<Product> GetProducts() {
            return _products.Values.ToList();
        }

        public List<Sale> GetSalesByRange(DateTime startDate, DateTime endDate) {
            DateTime realEndDate = new DateTime(endDate.Year, endDate.Month, endDate.Day, 23, 59, 59);
            return _sales.Where(
                    s => s.SaleDate >= startDate && s.SaleDate <= realEndDate && s.SaleDate <= DateTime.Now).ToList();
        }

        public IEnumerable<DaySaleDto> GetDaySaleDtoWithDate(DateTime startDate, DateTime endDate) {
            return (from sale in GetSalesByRange(startDate, endDate)
                    group sale by new {
                        Product = sale.product.name,
                        Region = sale.Region,
                        Sector = sale.Sector,
                        Channel = sale.Channel,
                        Customer = sale.company.name,
                        Discount = sale.Discount / Data.Products[sale.product.id - 1].listPrice,
                        SaleDate = new DateTime(sale.SaleDate.Year,
                        sale.SaleDate.Month, sale.SaleDate.Day, 0, 0, 0)
                    } into rs

                    select new DaySaleDto {
                        Product = rs.Key.Product,
                        Region = rs.Key.Region,
                        Sector = rs.Key.Sector,
                        SaleDate = rs.Key.SaleDate,
                        Channel = rs.Key.Channel,
                        Units = rs.Sum(s => s.Units),
                        Amount = (double) rs.Sum(s => s.TotalCost),
                        Customer = rs.Key.Customer,
                        Discount = rs.Key.Discount
                    });
        }
    }
}
