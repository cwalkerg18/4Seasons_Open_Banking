﻿namespace SalesViewer.Models.Dtos {
    public class CompaniesDto {
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string postalCode { get; set; }
        public string phone { get; set; }
        public string fax { get; set; }
    }
}