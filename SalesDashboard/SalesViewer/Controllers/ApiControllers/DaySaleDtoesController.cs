using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Query;
using System.Web.Http.OData.Routing;
using SalesViewer.Models.Dtos;
using Microsoft.Data.OData;
using SalesViewer.Models;
using System.Web.Http.Cors;

namespace SalesViewer.Controllers.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DaySaleDtoesController : ODataController
    {

        // GET: odata/DaySaleDtoes
        [EnableQuery(MaxOrderByNodeCount = 7, MaxNodeCount = 1000)]
        public IQueryable<DaySaleDto> GetDaySaleDtoes(DateTime startDate, DateTime endDate)
        {
            return SalesRepository.Instance.GetDaySaleDtoWithDate(startDate, endDate).AsQueryable<DaySaleDto>();
        }

    }
}
