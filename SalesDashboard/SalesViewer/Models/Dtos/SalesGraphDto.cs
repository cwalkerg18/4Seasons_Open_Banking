using System;

namespace SalesViewer.Models.Dtos {
    public class SalesGraphDto {
        public DateTime SaleDate { get; set; }
        public decimal Sales { get; set; }
    }
}