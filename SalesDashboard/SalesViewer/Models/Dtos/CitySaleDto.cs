
using System.Collections.Generic;
namespace SalesViewer.Models.Dtos {
    public class CitySaleDto {
        public string City { get; set; }
        public string Country { get; set; }
        public decimal Amount { get; set; }
        public List<SalesGraphDto> Dynamics { get; set; }
    }
}