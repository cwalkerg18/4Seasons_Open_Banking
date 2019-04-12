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
    public class CompaniesController : BaseApiController
    {
        //
        // GET: /Companies/

        public IEnumerable<CompaniesDto> GetCompanies() {

            return (from company in Repository.GetCompanies()
                    select new CompaniesDto {
                        id = company.id,
                        name = company.name,
                        address = company.address,
                        city = company.city,
                        state = company.state,
                        postalCode = company.postalCode,
                        phone = company.phone,
                        fax = company.fax,
                    });
        }

    }
}
