using System;
using System.Collections.Generic;
using System.Linq;
using SalesViewer.Models.Dtos;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SalesController : BaseApiController
    {

        public SalesPerformanceDto GetSales() { 
            return GetSales(DateTime.Now);
        }

        public SalesPerformanceDto GetSales(DateTime now)
        {
            var sales = Repository.GetSales().Where(s => s.SaleDate <= now).ToList();
            var today = now.Date;
            var yesterday = today.AddDays(-1).Date;
            var prevWeekStart = today.AddDays(-7);
            while (prevWeekStart.DayOfWeek != DayOfWeek.Sunday) {
                prevWeekStart = prevWeekStart.AddDays(-1);
            }
            var prevWeekEnd = prevWeekStart.AddDays(7).AddSeconds(-1);
            var currentMonthStart = new DateTime(today.Year, today.Month, 1);
            var lastMonthStart = currentMonthStart.AddMonths(-1);
            var lastMonthEnd = currentMonthStart.AddSeconds(-1);
            var currentYearStart = new DateTime(today.Year, 1, 1);

            var ytdSales = sales.Where(s => s.SaleDate >= currentYearStart).Sum(s => s.TotalCost);
            var lastYtdSales = sales.Where(s => s.SaleDate >= currentYearStart.AddYears(-1) && s.SaleDate <= DateTime.Now.AddYears(-1)).Sum(s => s.TotalCost);
            var lastYearSales = sales.Where(s => s.SaleDate.Year == today.AddYears(-1).Year).Sum(s => s.TotalCost);
            var daily = new DailyPerformanceDto {
                TodaySales = sales.Where(s => s.SaleDate.Date == today).Sum(s => s.TotalCost),
                YesterdaySales = sales.Where(s => s.SaleDate.Date == yesterday).Sum(s => s.TotalCost),
                LastWeekSales = sales.Where(s => s.SaleDate >= prevWeekStart && s.SaleDate <= prevWeekEnd).Sum(s => s.TotalCost)
            };
            var monthly = new MonthlyPerformanceDto {
                ThisMonthSales = sales.Where(s => s.SaleDate >= currentMonthStart).Sum(s => s.TotalCost),
                LastMonthSales = sales.Where(s => s.SaleDate >= lastMonthStart && s.SaleDate <= lastMonthEnd).Sum(s => s.TotalCost),
                YTDSales = ytdSales
            };
            var annual = new AnnualPerformanceDto {
                LastYearSales = lastYearSales,
                YTDSales = ytdSales,
                ForecastSales = lastYtdSales != 0 ? lastYearSales * (1 + (ytdSales - lastYtdSales) / lastYtdSales) : 0
            };
            var salesBySectors = (from rs in sales.GroupBy(s => s.Sector)
                      select new CriteriaSalesDto {
                          Criteria = rs.Key,
                          Sales = rs.Sum(s => s.TotalCost),
                          Units = rs.Sum(s => s.Units)
                      }).ToList();
            
            return new SalesPerformanceDto {
                DailyPerformance = daily,
                MonthlyPerformance = monthly,
                AnnualPerformance = annual,
                SalesBySector = salesBySectors
            };
        }

        public IEnumerable<SalesGraphDto> GetDailySales(DateTime day) {
            var sales = Repository.GetSales().Where(s => s.SaleDate.Date == day.Date && s.SaleDate <= DateTime.Now);
            var list = (from rs in sales.GroupBy(s => new DateTime(s.SaleDate.Year, s.SaleDate.Month, s.SaleDate.Day, s.SaleDate.Hour, 0, 0))
                      select new SalesGraphDto {
                          SaleDate = rs.Key,
                          Sales = rs.Sum(s => s.TotalCost)
                      }).OrderBy(x => x.SaleDate).ToList();
            return list;
        }

        public IEnumerable<SalesGraphDto> GetMonthlySales(DateTime month) {
            var sales = Repository.GetSales().Where(s => s.SaleDate.Year == month.Year && s.SaleDate.Month == month.Month && s.SaleDate <= DateTime.Now);
            var list = (from rs in sales.GroupBy(s => new DateTime(s.SaleDate.Year, s.SaleDate.Month, s.SaleDate.Day))
                        select new SalesGraphDto {
                            SaleDate = rs.Key,
                            Sales = rs.Sum(s => s.TotalCost)
                        }).OrderBy(x => x.SaleDate).ToList();
            return list;
        }

        public IEnumerable<SalesGraphDto> GetSalesRange(DateTime startDate, DateTime endDate)
        {
            var sales =
                Repository.GetSalesByRange(startDate, endDate);

            var list =
                (from rs in sales.GroupBy(s => new DateTime(s.SaleDate.Year, s.SaleDate.Month, s.SaleDate.Day))
                 select new SalesGraphDto
                            {
                                SaleDate = rs.Key,
                                Sales = rs.Sum(s => s.TotalCost)
                            }).OrderBy(x=>x.SaleDate).ToList();
            return list;
        }

       
    }
}