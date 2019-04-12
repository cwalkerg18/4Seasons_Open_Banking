using System.Web.Http;
using SalesViewer.Models;

namespace SalesViewer.Controllers.ApiControllers
{
    public class BaseApiController : ApiController
    {
        protected readonly ISalesRepository Repository;

        public BaseApiController()
        {
            Repository = SalesRepository.Instance;
        }
    }
}
