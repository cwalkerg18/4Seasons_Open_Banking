
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace SalesViewer.Models.Dtos {
    public class DaySaleDto {
        public DaySaleDto() {
            Dynamics = new HashSet<SalesGraphDto>();
        }
        [Key]
        public string Region { get; set; }
        [Key]
        public string Sector { get; set; }
        [Key]
        public string Channel { get; set; }
        public int Units { get; set; }
        [Key]
        public string Customer { get; set; }
        [Key]
        public string Product { get; set; }
        public double Amount { get; set; }
        [Key]
        public decimal Discount { get; set; }
        [Key]
        public DateTime? SaleDate { get; set; }
        public ICollection<SalesGraphDto> Dynamics { get; set; }

    }
}