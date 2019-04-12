using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesViewer.Models.Dtos {
    public class CritariaSalesDaysDto {
        public string Criteria { get; set; }
        public decimal TodaySales { get; set; }
        public int ThisMonthUnits { get; set; }
        public decimal YesterdaySales { get; set; }
        public int LastMonthUnits { get; set; }
    }
}