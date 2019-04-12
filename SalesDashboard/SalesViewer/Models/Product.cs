using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesViewer.Models {
    public class Product {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal baseCost { get; set; }
        public decimal listPrice { get; set; }
        public int unitsInInventory { get; set; }
        public int unitsInManufactoring { get; set; }
        public string plant { get; set; }
        public string pManager { get; set; }
        public string sManager { get; set; }
    }
}