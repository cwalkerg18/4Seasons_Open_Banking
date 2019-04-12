using System;
using System.Collections.Generic;
using System.Linq;
using SalesViewer.Models.Dtos;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductsController : CriteriaApiController
    {
        public ProductsController() : base(sale => sale.product.name) { }
    }
}
