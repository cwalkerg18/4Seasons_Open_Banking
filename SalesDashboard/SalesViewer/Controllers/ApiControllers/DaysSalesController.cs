using SalesViewer.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using System.Collections;
using SalesViewer.Models;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers {

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DaysSalesController : BaseApiController {

        public IEnumerable<DaySaleDto> GetSalesWithDynamics(DateTime startDate, DateTime endDate) {
            return
               (from sale in Repository.GetSalesByRange(startDate, endDate)
                group sale by new {
                    Product = sale.product.name,
                    Region = sale.Region,
                    Sector = sale.Sector,
                    Channel = sale.Channel
                } into rs

                select new DaySaleDto {
                    Product = rs.Key.Product,
                    Region = rs.Key.Region,
                    Sector = rs.Key.Sector,
                    Channel = rs.Key.Channel,
                    Units = rs.Sum(s => s.Units),
                    Amount = (double) rs.Sum(s => s.TotalCost),
                    Dynamics = (from ph in rs.GroupBy(s => new DateTime(s.SaleDate.Year,
                        s.SaleDate.Month, s.SaleDate.Day, 0, 0, 0))
                                orderby ph.Key descending
                                select new SalesGraphDto {
                                    SaleDate = ph.Key,
                                    Sales = ph.Sum(s => s.TotalCost)
                                }).ToList()

                }).AsQueryable();
        }

        public IEnumerable<DaySaleDto> GetWithDate(DateTime startDate, DateTime endDate) {
            return Repository.GetDaySaleDtoWithDate(startDate, endDate);
        }
    }
}
