using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesViewer.Models {
    public class Region {
        public string region { get; set; }
        public List<City> cities { get; set; }
    }
}