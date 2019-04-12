using SalesViewer.Models.Dtos;
using System;
using System.Collections.Generic;

namespace SalesViewer.Models {
    public interface ISalesRepository {
        IEnumerable<Sale> GetSales();
        IEnumerable<Company> GetCompanies();
        IEnumerable<Product> GetProducts();
        List<Sale> GetSalesByRange(DateTime startDate, DateTime endDate);
        IEnumerable<DaySaleDto> GetDaySaleDtoWithDate(DateTime startDate, DateTime endDate);
    }
}
