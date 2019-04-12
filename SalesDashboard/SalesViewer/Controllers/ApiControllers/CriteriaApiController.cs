using System;
using System.Collections.Generic;
using System.Linq;
using SalesViewer.Models;
using SalesViewer.Models.Dtos;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CriteriaApiController : BaseApiController
    {
        private Func<Sale, string>  _groupFunc;
        public CriteriaApiController(Func<Sale,string> groupFunc) {
            _groupFunc = groupFunc;
        }

        public CriteriaPerformanceDto GetCriteriaSalesPerformance() {
            return GetDefinedCriteriaSalesPerformance(DateTime.Now);
        }

        public CriteriaPerformanceDto GetDefinedCriteriaSalesPerformance(DateTime now) {
            var sales = Repository.GetSales().Where(s => s.SaleDate <= now).ToList();
            var today = now.Date;
            var yesterday = today.AddDays(-1).Date;
            var prevWeekStart = today.AddDays(-7);
            while(prevWeekStart.DayOfWeek != DayOfWeek.Sunday) {
                prevWeekStart = prevWeekStart.AddDays(-1);
            }
            var prevWeekEnd = prevWeekStart.AddDays(7).AddSeconds(-1);
            var currentMonthStart = new DateTime(today.Year, today.Month, 1);
            var lastMonthStart = currentMonthStart.AddMonths(-1);
            var lastMonthEnd = currentMonthStart.AddSeconds(-1);
            var currentYearStart = new DateTime(today.Year, 1, 1);

            var ytdSales = sales.Where(s => s.SaleDate >= currentYearStart).Sum(s => s.Units);

            return new CriteriaPerformanceDto {
                TodaySales = sales.Where(s => s.SaleDate.Date == today).Sum(s => s.TotalCost),
                YesterdaySales = sales.Where(s => s.SaleDate.Date == yesterday).Sum(s => s.TotalCost),
                LastWeekSales = sales.Where(s => s.SaleDate >= prevWeekStart && s.SaleDate <= prevWeekEnd).Sum(s => s.TotalCost),
                ThisMonthUnits = sales.Where(s => s.SaleDate >= currentMonthStart).Sum(s => s.Units),
                LastMonthUnits = sales.Where(s => s.SaleDate >= lastMonthStart && s.SaleDate <= lastMonthEnd).Sum(s => s.Units),
                YtdUnits = ytdSales
            };
        }

        public IEnumerable<CriteriaSalesDto> GetDailySales(DateTime day) {
            var sales =
                Repository.GetSales().Where(
                    s => s.SaleDate.Date == day.Date && s.SaleDate <= DateTime.Now);

            return (from sale in sales.GroupBy(_groupFunc)
                    select new CriteriaSalesDto {
                        Criteria = sale.Key,
                        Sales = sale.Sum(s => s.TotalCost),
                        Units = sale.Sum(s => s.Units)
                    }).OrderBy(x => x.Criteria);
        }

        public IEnumerable<CriteriaSalesDto> GetMonthlySales(DateTime month) {
            var sales =
                Repository.GetSales().Where(
                    s => s.SaleDate.Year == month.Year && s.SaleDate.Month == month.Month && s.SaleDate <= DateTime.Now);

            return (from sale in sales.GroupBy(_groupFunc)
                    select new CriteriaSalesDto {
                        Criteria = sale.Key,
                        Sales = sale.Sum(s => s.TotalCost),
                        Units = sale.Sum(s => s.Units)
                    }).OrderBy(x => x.Criteria);
        }

        public IEnumerable<CriteriaSalesDto> GetSalesByRange(DateTime startDate, DateTime endDate) {
            var sales =
                Repository.GetSalesByRange(startDate, endDate);

            return (from sale in sales.GroupBy(_groupFunc)
                    select new CriteriaSalesDto {
                        Criteria = sale.Key,
                        Sales = sale.Sum(s => s.TotalCost),
                        Units = sale.Sum(s => s.Units)
                    }).OrderBy(x => x.Criteria);
        }

        public IEnumerable<CriteriaSalesDto> GetSalesByRangeAndId(DateTime startDate, DateTime endDate, int id, string type) {
            var sales =
                type == "company" ?
                Repository.GetSalesByRange(startDate, endDate).Where(s => s.company.id == id) :
                Repository.GetSalesByRange(startDate, endDate).Where(s => s.product.id == id);
                
            return (from sale in sales.GroupBy(_groupFunc)
                    select new CriteriaSalesDto {
                        Criteria = sale.Key,
                        Sales = sale.Sum(s => s.TotalCost),
                        Units = sale.Sum(s => s.Units)
                    }).OrderBy(x => x.Criteria);
        }

        public IEnumerable<CritariaSalesDaysDto> GetTwoDaysSales(DateTime twoDays) {
            var sales =
                Repository.GetSales().Where(
                    s => s.SaleDate.Date == twoDays.Date || s.SaleDate.Date == twoDays.Date.AddDays(-1) && s.SaleDate <= DateTime.Now);

            return (from sale in sales.GroupBy(_groupFunc)
                    group sale by new {
                        Product = sale.Key,
                        TodaySales = sale.Where(x => x.SaleDate.Date == twoDays.Date).Sum(s => s.TotalCost),
                        YesterdaySales = sale.Where(x => x.SaleDate.Date == twoDays.Date.AddDays(-1)).Sum(s => s.TotalCost)
                    } into rs
                    select new CritariaSalesDaysDto {
                        TodaySales = rs.Key.TodaySales,
                        YesterdaySales = rs.Key.YesterdaySales,
                        Criteria = rs.Key.Product
                    }).OrderBy(x => x.Criteria).ToList();

        }

        public IEnumerable<CritariaSalesDaysDto> GetTwoMonthUnits(DateTime twoMonths) {
            return from s in Repository.GetSales()
                   where s.SaleDate >= twoMonths.Date.AddMonths(-2) && s.SaleDate <= DateTime.Now
                   group s by _groupFunc(s) into g
                   group g by new {
                       Criteria = g.Key,
                       ThisMonthUnits = g.Where(s => s.SaleDate.Month == twoMonths.Month).Sum(s => s.Units),
                       LastMonthUnits = g.Where(s => s.SaleDate.Month == twoMonths.Date.AddMonths(-1).Month).Sum(s => s.Units)
                   } into rs
                   orderby rs.Key.Criteria
                   select new CritariaSalesDaysDto {
                       ThisMonthUnits = rs.Key.ThisMonthUnits,
                       LastMonthUnits = rs.Key.LastMonthUnits,
                       Criteria = rs.Key.Criteria
                   };
        }
    }
}
