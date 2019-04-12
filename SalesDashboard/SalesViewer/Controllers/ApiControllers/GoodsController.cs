using SalesViewer.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GoodsController : BaseApiController
    {
        //
        // GET: /Goods/
        //NOTE - it is the bad name for controller, but /products/ already on use

        public IEnumerable<ProductsDto> GetProducts() {

            return (from product in Repository.GetProducts()
                    select new ProductsDto(product));
        }

        public IEnumerable<ProductsDto> GetProductById(int id) {

            return from product in Repository.GetProducts().Where(s => s.id == id)
                   select new ProductsDto(product);
        }

    }
}
