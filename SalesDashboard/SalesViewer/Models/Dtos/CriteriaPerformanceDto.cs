namespace SalesViewer.Models.Dtos
{
    public class CriteriaPerformanceDto
    {
        public decimal TodaySales { get; set; }
        public decimal YesterdaySales { get; set; }
        public decimal LastWeekSales { get; set; }

        public decimal ThisMonthUnits { get; set; }
        public decimal LastMonthUnits { get; set; }
        public decimal YtdUnits { get; set; }
    }
}