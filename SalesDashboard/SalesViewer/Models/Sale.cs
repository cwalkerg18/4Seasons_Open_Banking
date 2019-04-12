using System;

namespace SalesViewer.Models {
    public class Sale {
        public int Units { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime SaleDate { get; set; }

        public string Region { get; set; }
        public string Channel { get; set; }
        public string Sector { get; set; }

        public Product product { get; set; }
        public Company company { get; set; }
        public City city { get; set; }
    }
}