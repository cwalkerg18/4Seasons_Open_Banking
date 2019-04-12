using System;
using System.Collections.Generic;
using System.Linq;
using SalesViewer;
using SalesViewer.Models;
using SalesViewer.Models.Dtos;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CitiesController : BaseApiController
    {
        //
        // GET: /Cities/
        private class SalesCity : City {
            public decimal sales { get; set; }
        }

        public IEnumerable<CitiesGraphDto> GetCitiesSalesByMap(string map, DateTime startDate, DateTime endDate) {
            return from sale in Repository.GetSalesByRange(startDate, endDate)
                   where sale.city.map.StartsWith(map ?? string.Empty)
                   group sale by sale.city into g
                   let sumCost = g.Sum(sale => sale.TotalCost)
                   orderby sumCost descending
                   select new CitiesGraphDto {
                       City = g.Key.name,
                       Coordinates = new double[] { g.Key.latitude, g.Key.longtitude },
                       Sales = sumCost,
                       Country = g.Key.country,
                       State = g.Key.state
                   };
        }

        public IEnumerable<CitiesGraphDto> GetCitiesSalesByCompany(int companyId, DateTime startDate, DateTime endDate) {
            var sales = Repository.GetSalesByRange(startDate, endDate).Where(s => s.company.id == companyId);
            var result = new Dictionary<string, SalesCity>();
            foreach (var sale in sales) {
                SalesCity city = new SalesCity { name = sale.city.name, latitude = sale.city.latitude, longtitude = sale.city.longtitude, sales = 0m, country = sale.city.country, state = sale.city.state };
                var value = sale.TotalCost;
                if (!result.ContainsKey(city.name)) result.Add(city.name, city);
                result[city.name].sales += value;
            }
            return (from item in result
                    orderby item.Value.sales descending
                    select new CitiesGraphDto {
                        City = item.Value.name,
                        Coordinates = new double[2] { item.Value.latitude, item.Value.longtitude },
                        Sales = item.Value.sales,
                        Country = item.Value.country,
                        State = item.Value.state
                    });
        }

        public IEnumerable<CitySaleDto> GetCitiesSalesByRange(DateTime startDate, DateTime endDate, string dynamicsGroupBy) {
            Func<Sale, DateTime> dynamicsGroupAction;
            switch(dynamicsGroupBy) {
                case "day":
                    dynamicsGroupAction = s => new DateTime(s.SaleDate.Year, s.SaleDate.Month, s.SaleDate.Day, 0, 0, 0);
                    break;
                case "hour":
                    dynamicsGroupAction = s => new DateTime(2001, 01, 01, s.SaleDate.Hour, 0, 0);
                    break;
                default:
                    throw new NotImplementedException();
            }
            var list = (from sale in Repository.GetSalesByRange(startDate, endDate)
                        group sale by new {
                            Country = sale.city.country,
                            City = sale.city.name
                        } into rs

                        select new CitySaleDto {
                            Country = rs.Key.Country,
                            City = rs.Key.City,
                            Amount = rs.Sum(s => s.TotalCost),
                            Dynamics = (from ph in rs.GroupBy(dynamicsGroupAction)
                                        orderby ph.Key descending
                                        select new SalesGraphDto {
                                            SaleDate = ph.Key,
                                            Sales = ph.Sum(s => s.TotalCost)
                                        }).ToList()

                        }).ToList();

            return list;
        }
    }
}
