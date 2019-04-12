namespace SalesViewer.Models.Dtos {
    public class AnnualPerformanceDto {
        public decimal YTDSales { get; set; }
        public decimal ForecastSales { get; set; }
        public decimal LastYearSales { get; set; }
    }
}