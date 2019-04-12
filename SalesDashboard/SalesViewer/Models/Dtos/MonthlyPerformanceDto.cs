namespace SalesViewer.Models.Dtos {
    public class MonthlyPerformanceDto {
        public decimal ThisMonthSales { get; set; }
        public decimal LastMonthSales { get; set; }
        public decimal YTDSales { get; set; }
    }
}