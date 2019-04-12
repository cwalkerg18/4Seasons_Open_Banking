using System;
using System.Collections.Generic;
using SalesViewer.Models.Dtos;

namespace SalesViewer.Controllers.ApiControllers
{
    public interface ICriteriaApiController
    {
        CriteriaPerformanceDto GetCriteriaSalesPerformance();
        IEnumerable<CriteriaSalesDto> GetDailySales(DateTime day);
        IEnumerable<CriteriaSalesDto> GetMonthlySales(DateTime month);
        IEnumerable<CriteriaSalesDto> GetSalesByRange(DateTime startDate, DateTime endDate);
        IEnumerable<CriteriaSalesDto> GetSalesByRangeAndId(DateTime startDate, DateTime endDate, int productId, string type);
    }
}
