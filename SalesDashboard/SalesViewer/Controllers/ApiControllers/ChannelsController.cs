using System;
using System.Collections.Generic;
using System.Linq;
using SalesViewer.Models.Dtos;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ChannelsController : BaseApiController
    {
        public IEnumerable<ChannelsGraphDto> GetDailyChannels(DateTime day)
        {
            var sales = Repository.GetSales().Where(s => s.SaleDate.Date == day.Date && s.SaleDate <= DateTime.Now);

            var result = new Dictionary<DateTime, Dictionary<string, decimal>>();
            foreach (var sale in sales)
            {
                var date = new DateTime(sale.SaleDate.Year, sale.SaleDate.Month, sale.SaleDate.Day, sale.SaleDate.Hour, 0, 0);
                var channel = sale.Channel;
                var value = sale.TotalCost;
                if (!result.ContainsKey(date)) result.Add(date, new Dictionary<string, decimal>());
                if (!result[date].ContainsKey(channel)) result[date].Add(channel, 0m);
                result[date][channel] += value;

            }
            return (from item in result
                   select new ChannelsGraphDto
                   {
                       SaleDate = item.Key,
                       SalesByChannel = item.Value
                   }).OrderBy(x => x.SaleDate);
        }

        public IEnumerable<CriteriaSalesDto> GetSalesByRange(DateTime startDate, DateTime endDate)
        {
            return from sale in Repository.GetSalesByRange(startDate, endDate)
                   group sale by sale.Channel into g
                   orderby g.Key
                   select new CriteriaSalesDto
                   {
                       Criteria = g.Key,
                       Sales = g.Sum(s => s.TotalCost),
                       Units = g.Sum(s => s.Units)
                   };
        }

        public IEnumerable<CriteriaSalesDto> GetSalesByRangeAndId(DateTime startDate, DateTime endDate, int productId, string type) {
            return from sale in Repository.GetSalesByRange(startDate, endDate)
                   where productId == (type == "company" ? sale.company.id : sale.product.id)
                   group sale by sale.Channel into g
                   orderby g.Key
                   select new CriteriaSalesDto {
                       Criteria = g.Key,
                       Sales = g.Sum(s => s.TotalCost),
                       Units = g.Sum(s => s.Units)
                   };
        }
    }
}
