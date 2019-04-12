using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesViewer.Models {
    public class City {
        public int id { get; set; }
        public string name { get; set; }
        public double latitude { get; set; }
        public double longtitude { get; set; }
        public string map { get; set; }
        public string country { get; set; }
        public string state { get; set; }
    }
}