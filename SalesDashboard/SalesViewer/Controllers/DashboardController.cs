using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SalesViewer.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            return Sectors();
        }
        public ActionResult Channels() {
            return View("Channel");
        }
        public ActionResult Sectors() {
            return View("Criteria", (object)"Sectors");
        }
        public ActionResult Products() {
            return View("Criteria", (object)"Products");
        }
        

    }
}
