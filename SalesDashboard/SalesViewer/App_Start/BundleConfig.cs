
using dotless.Core.configuration;
using dotless.Core.Input;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using System.Web.Optimization;
namespace SalesViewer.App_Start {
    public class BundleConfig {

        public static readonly Dictionary<string, string> viewsBundles = new Dictionary<string, string> { 
            {"channels", "~/bundles/channels"},
            {"criteria", "~/bundles/criteria"},
            {"customers", "~/bundles/customers"},
            {"products", "~/bundles/products"},
            {"sales", "~/bundles/sales"},
        };

        public static readonly string SiteLessBundle = "~/bundles/less";
        public static readonly string SiteCssBundle = "~/css/bundles";
        public static readonly string SiteJsBundle = "~/bundles/js";
        public static readonly string SiteJquery1Bundle = "~/bundles/jquery1";
        public static readonly string SiteJquery2Bundle = "~/bundles/jquery2";
        public static void RegisterBundles(BundleCollection bundles) {
            Bundle lessBundle = new Bundle(SiteLessBundle).Include("~/css/site.less");
            Bundle jsBundle = new Bundle(SiteJsBundle).Include(
                "~/js/jquery.min.js",
                "~/js/cldr.min.js",
                "~/js/cldr/event.min.js",
                "~/js/cldr/supplemental.min.js",
                "~/js/globalize.min.js",
                "~/js/globalize/message.min.js",
                "~/js/globalize/number.min.js",
                "~/js/globalize/currency.min.js",
                "~/js/globalize/date.min.js",
                "~/js/dx.viz-web.js",
                "~/js/vectormap-data/world.js",
                "~/js/vectormap-data/africa.js",
                "~/js/vectormap-data/canada.js",
                "~/js/vectormap-data/eurasia.js",
                "~/js/vectormap-data/europe.js",
                "~/js/vectormap-data/usa.js",

                "~/scripts/date.js",
                "~/scripts/switcher.js",
                "~/scripts/sharedWidgets.js",
                "~/scripts/dashboard.js",
                "~/scripts/topmenu.js",
                "~/scripts/legend.js",
                "~/scripts/index.js"
                );
            Bundle cssBundle = new Bundle(SiteCssBundle).Include(
                "~/css/dx.common.css",
                "~/css/dx.light.css" 
                );
            
            lessBundle.Transforms.Add(new LessTransform());
            lessBundle.Transforms.Add(new CssMinify());
            cssBundle.Transforms.Add(new CssMinify());
            bundles.Add(lessBundle);
            bundles.Add(jsBundle);
            bundles.Add(cssBundle);
            foreach (KeyValuePair<string, string> bundle in viewsBundles) {
                bundles.Add(new Bundle(bundle.Value).Include("~/scripts/" + bundle.Key + ".js"));
            }

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }


    public class LessTransform : IBundleTransform {
        public void Process(BundleContext context, BundleResponse response) {
            DotlessConfiguration config = new DotlessConfiguration();
            config.LessSource = typeof(VirtualFileReader);
            response.Content = dotless.Core.Less.Parse(response.Content, config);
            response.ContentType = "text/css";
        }
    }

}