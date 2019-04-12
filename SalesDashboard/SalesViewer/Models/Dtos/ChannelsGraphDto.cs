using System;
using System.Collections.Generic;

namespace SalesViewer.Models.Dtos {
    public class ChannelsGraphDto {
        public DateTime SaleDate { get; set; }
        public Dictionary<string, decimal> SalesByChannel { get; set; }
    }
}