using System;
using System.Collections.Generic;

namespace SalesViewer.Models.Dtos {
    public class CitiesGraphDto {
        public string City { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public double[] Coordinates { get; set; }
        public decimal Sales { get; set; }
    }
}