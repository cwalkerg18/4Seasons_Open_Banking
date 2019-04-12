using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesViewer.Models {
    public static class Data {
        public static readonly List<string> Channels = new List<string> { "Direct", "VARs", "Consultants", "Resellers", "Retail" };
        public static readonly List<string> Regions = new List<string> { "North America", "South America", "Europe", "Asia", "Australia", "Africa" };
        public static readonly List<string> Sectors = new List<string> { "Energy", "Manufacturing", "Telecom", "Insurance", "Banking", "Health" };
        public static readonly List<Region> RegionsWithCities = new List<Region> { 
                    new Region { region = "North America", cities = new List<City>(){ 
                            new City { id = 1, name = "New York", latitude = 40.66, longtitude = -74.03, map = "usa", country = "United States", state = "New York"},
                            new City { id = 2, name = "Los Angeles", latitude = 34.02, longtitude = -118.41, map = "usa", country = "United States", state = "California"},
                            new City { id = 3, name = "Chicago", latitude = 41.83, longtitude = -87.73, map = "usa", country = "United States", state = "Illinois"},
                            new City { id = 4, name = "Houston", latitude = 29.78, longtitude = -95.38, map = "usa", country = "United States", state = "Texas"},
                            new City { id = 5, name = "Jacksonville", latitude = 30.3370, longtitude = -81.66, map = "usa", country = "United States", state = "Florida"},
                            new City { id = 6, name = "Billings", latitude = 45.78, longtitude = -108.56, map = "usa", country = "United States", state = "Montana"},
                            new City { id = 7, name = "Portland", latitude = 45.54, longtitude = -122.65, map = "usa", country = "United States", state = "Oregon"},
                            new City { id = 8, name = "Denver", latitude = 39.76, longtitude = -104.85, map = "usa", country = "United States", state = "Colorado"},
                            new City { id = 9, name = "Oklahoma City", latitude = 35.48, longtitude = -97.47, map = "usa", country = "United States", state = "Oklahoma"},
                            new City { id = 10, name = "San Jose", latitude = 37.29, longtitude = -121.81, map = "usa", country = "United States", state = "California"},
                            new City { id = 11, name = "Ottawa", latitude = 45.60, longtitude = -75.70, map = "canada", country = "Canada", state = "Ontario"},
                            new City { id = 12, name = "Winnipeg", latitude = 49.88, longtitude = -97.14, map = "canada", country = "Canada", state = "Manitoba"},
                            new City { id = 13, name = "Edmonton", latitude = 53.54, longtitude = -113.49, map = "canada", country = "Canada", state = "Alberta"},
                            new City { id = 14, name = "Vancouver", latitude = 49.25, longtitude = -123, map = "canada", country = "Canada", state = "British Columbia"},
                            new City { id = 15, name = "Halifax", latitude = 44.69, longtitude = -63.56, map = "canada", country = "Canada", state = "Nova Scotia"}
                        }
                    },       
                    new Region { region = "South America", cities = new List<City>(){ 
                            new City { id = 16, name = "Rio de Janeiro", latitude = -22.91, longtitude = -43.44, map = "", country = "Brazil", state = ""},
                            new City { id = 17, name = "Buenos Aires", latitude = -34.61, longtitude = -58.43, map = "", country = "Argentina", state = ""},
                            new City { id = 18, name = "Manaus", latitude = -3.1, longtitude = -60.02, map = "", country = "Brazil", state = ""},
                            new City { id = 19, name = "Asuncion", latitude = -25.27, longtitude = -57.62, map = "", country = "Paraguay", state = ""},
                            new City { id = 20, name = "La Paz", latitude = -16.50, longtitude = -68.14, map = "", country = "Bolivia", state = ""},
                            new City { id = 21, name = "Quito", latitude = -0.21, longtitude = -78.51, map = "", country = "Ecuador", state = ""},
                            new City { id = 22, name = "Lima", latitude = -12.05, longtitude = -77.07, map = "", country = "Peru", state = ""},
                            new City { id = 23, name = "Santiago", latitude = -33.45, longtitude = -70.61, map = "", country = "Chile", state = ""},
                            new City { id = 24, name = "Bogota", latitude = 4.59, longtitude = -74.08, map = "", country = "Colombia", state = ""},
                        }
                    },
                    new Region { region = "Europe", cities = new List<City>(){ 
                            new City { id = 25, name = "London", latitude = 51.50, longtitude = -0.12, map = "europe", country = "United Kingdom", state = ""},
                            new City { id = 26, name = "Berlin", latitude = 52.52, longtitude = 13.41, map = "europe", country = "Germany", state = ""},
                            new City { id = 27, name = "Madrid", latitude = 40.41, longtitude =  -3.70, map = "europe", country = "Spain", state = ""},
                            new City { id = 28, name = "Rome", latitude = 41.91, longtitude = 12.53, map = "europe", country = "Italy", state = ""},
                            new City { id = 29, name = "Lyon", latitude = 45.75, longtitude = 4.83, map = "europe", country = "France", state = ""},
                            new City { id = 30, name = "Vienna", latitude = 48.2, longtitude = 16.37, map = "europe", country = "Austria", state = ""},
                            new City { id = 31, name = "Sofia", latitude = 42.69, longtitude = 23.32, map = "europe", country = "Bulgaria", state = ""},
                            new City { id = 32, name = "Athens", latitude = 37.97, longtitude = 23.71, map = "europe", country = "Greece", state = ""},
                            new City { id = 33, name = "Moscow", latitude = 55.75, longtitude = 37.61, map = "europe", country = "Russia", state = ""},
                            new City { id = 34, name = "Oslo", latitude = 59.91, longtitude = 10.73, map = "europe", country = "Norway", state = ""}
                        }
                    },
                    new Region { region = "Asia", cities = new List<City>(){ 
                            new City { id = 35, name = "Tokyo", latitude = 35.673343, longtitude = 139.710388, map = "eurasia", country = "Japan", state = ""},
                            new City { id = 36, name = "Beijing", latitude = 39.90, longtitude = 116.39, map = "eurasia", country = "China", state = ""},
                            new City { id = 37, name = "Jerusalem", latitude = 31.78, longtitude = 35.20, map = "eurasia", country = "Israel", state = ""},
                            new City { id = 38, name = "Singapore", latitude = 1.28, longtitude = 103.85, map = "eurasia", country = "Malaysia", state = ""},
                            new City { id = 39, name = "Seoul", latitude = 37.51, longtitude = 126.98, map = "eurasia", country = "South Korea", state = ""},
                            new City { id = 40, name = "Abu Dhabi", latitude = 24.47, longtitude = 54.37, map = "eurasia", country = "United Arab Emirates", state = ""},
                            new City { id = 41, name = "Sanaa", latitude = 15.35, longtitude = 44.20, map = "eurasia", country = "Yemen", state = ""},
                            new City { id = 42, name = "Kuwait city", latitude = 29.37, longtitude = 47.98, map = "eurasia", country = "Kuwait", state = ""},
                            new City { id = 43, name = "Dhaka", latitude = 23.71, longtitude = 90.39, map = "eurasia", country = "Bangladesh", state = ""},
                            new City { id = 44, name = "Ulan Bator", latitude = 47.91, longtitude = 106.92, map = "eurasia", country = "Mongolia", state = ""}
                        }
                    },
                    new Region { region = "Australia", cities = new List<City>(){ 
                            new City { id = 45, name = "Sydney", latitude = -33.79, longtitude = 150.92, map = "", country = "Australia", state = ""},
                            new City { id = 46, name = "Brisbane", latitude = -27.47, longtitude = 153.02, map = "", country = "Australia", state = ""},
                            new City { id = 47, name = "Perth", latitude = -31.96, longtitude = 115.93, map = "", country = "Australia", state = ""},
                            new City { id = 48, name = "Melbourne", latitude = -37.86, longtitude = 145.08, map = "", country = "Australia", state = ""},
                            new City { id = 49, name = "Adelaide", latitude = -34.92, longtitude = 138.58, map = "", country = "Australia", state = ""},
                            new City { id = 51, name = "Hobart", latitude = -42.88, longtitude = 147.32, map = "", country = "Australia", state = ""},
                            new City { id = 52, name = "Darwin", latitude = -12.59, longtitude = 131.00, map = "", country = "Australia", state = ""}
                        }
                    },
                    new Region { region = "Africa", cities = new List<City>(){ 
                            new City { id = 55, name = "Pretoria", latitude = -25.98, longtitude = 28.21, map = "africa", country = "South Africa", state = ""},
                            new City { id = 56, name = "Cairo", latitude = 30.05, longtitude = 31.26, map = "africa", country = "Egypt", state = ""},
                            new City { id = 57, name = "Mogadishu", latitude = 2.05, longtitude = 45.30, map = "africa", country = "Somalia", state = ""},
                            new City { id = 58, name = "Abidjan", latitude = 5.34, longtitude = -3.97, map = "africa", country = "Ivory Coast", state = ""},
                            new City { id = 59, name = "Casablanca", latitude = 33.57, longtitude = -7.58, map = "africa", country = "Morocco", state = ""},
                            new City { id = 60, name = "Cape Town", latitude = -33.91, longtitude = 18.65, map = "africa", country = "South Africa", state = ""},
                            new City { id = 61, name = "N’Djamena", latitude = 12.12, longtitude = 15.05, map = "africa", country = "Chad", state = ""},
                            new City { id = 62, name = "Nairobi", latitude = -1.30, longtitude = 36.84, map = "africa", country = "Kenya", state = ""},
                            new City { id = 63, name = "Kano", latitude = 11.99, longtitude = 8.52, map = "africa", country = "Nigeria", state = ""},
                            new City { id = 64, name = "Dakar", latitude = 14.73, longtitude = -17.38, map = "africa", country = "Senegal", state = ""}
                        }
                    }
        };


        public static readonly List<Company> Companies = new List<Company>{
            new Company {id = 1, name = "Johnson & Assoc", address = "2379 Broadway", city = "New York", state="NY", postalCode="10024", fax = "(718) 917-6839", phone = "(718) 917-6839"},
            new Company {id = 2, name = "McCord Builders", address = "10756 Ashton Ave",  city = "Los Angeles", state="CA", postalCode="90024", fax = "(410) 418-9108", phone = "(410) 418-9108"},
            new Company {id = 3, name = "Building Management Inc", address = "107 S State St", city = "Chicago", state="IL", postalCode="60603", fax = "(773) 260-8071", phone = "(773) 260-8071"},
            new Company {id = 4, name = "System Integrators", address = "5215 W 34th St", city = "Houston", state="TX", postalCode="77092", fax = "(707) 220-9114", phone = "(707) 220-9114"},
            new Company {id = 5, name = "Discovery Systems", address = "2620 Dean Rd", city = "Jacksonville", state="FL", postalCode="32216", fax = "(847) 371-1555", phone = "(847) 371-1555"},
            new Company {id = 6, name = "Arthur & Sons", address = "2331 Lewis Ave", city = "Billings", state="MT", postalCode="59101", fax = "(561) 843-3972", phone = "(561) 843-3972"},
            new Company {id = 7, name = "Smith & Co", address = "1823 SW Spring St", city = "Portland", state="OR", postalCode="97201", fax = "(973) 312-3977", phone = "(973) 312-3977"},
            new Company {id = 8, name = "Beacon Systems", address = "1435 Wazee St #102", city = "Denver", state="CO", postalCode="80202", fax = "(567) 644-4728", phone = "(567) 644-4728"},
            new Company {id = 9, name = "Gemini Stores", address = "1401 S May Ave", city = "Oklahoma City", state="OK", postalCode="73108", fax = "(817) 308-0853", phone = "(817) 308-0853"},
            new Company {id = 10, name = "Columbia Solar", address = "1933 Shearwood Forest Drive", city = "San Jose", state="CA", postalCode="95126", fax = "(860) 205-1690", phone = "(860) 205-1691"},
            new Company {id = 11, name = "Renewable Supplies", address = "484 Broome St", city = "New York", state="NY", postalCode="10002", fax = "(804) 615-5863", phone = "(804) 615-5863"},
            new Company {id = 12, name = "Supply Warehous", address = "2239 W 29th Pl", city = "Los Angeles", state="CA", postalCode="90018", fax = "(315) 924-8962", phone = "(315) 924-8962"},
            new Company {id = 13, name = "Get Solar Inc", address = "500 W Madison St", city = "Chicago", state="IL", postalCode="60606", fax = "(954) 718-3876", phone = "(954) 718-3876"},
            new Company {id = 14, name = "Solar Warehouse", address = "1510 Polk St", city = "Houston", state="TX", postalCode="77002", fax = "(775) 202-0360", phone = "(775) 202-0360"},
            new Company {id = 15, name = "Green Energy Inc", address = "6045 Greenland Rd", city = "Jacksonville", state="FL", postalCode="32256", fax = "(541) 286-0792", phone = "(541) 286-0792"},
            new Company {id = 16, name = "Energy Systems", address = "PO Box 31156", city = "Billings", state="MT", postalCode="59116", fax = "(724) 255-0997", phone = "(724) 255-0997"},
            new Company {id = 17, name = "Apollo Inc", address = "1221 SW Yamhill St", city = "Portland", state="OR", postalCode="97204", fax = "(804) 264-8719", phone = "(804) 264-8713"},
            new Company {id = 18, name = "Mercury Solar", address = "851 S Santa Fe Ave", city = "Denver", state="CO", postalCode="80292", fax = "(731) 451-8686", phone = "(731) 451-8686"},
            new Company {id = 19, name = "Global Services", address = "8300 Greystone Ave", city = "Oklahoma City", state="OK", postalCode="73116", fax = "(916) 992-6492", phone = "(916) 992-6492"},
            new Company {id = 20, name = "Market Eco", address = "1602 The Alameda # 1013", city = "San Jose", state="CA", postalCode="95126", fax = "(619) 946-9413", phone = "(619) 946-9413"},
            new Company {id = 21, name = "Environment Solar", address = "185 Columbus Ave", city = "New York", state="NY", postalCode="10023", fax = "(601) 534-6561", phone = "(601) 534-6561"},
            new Company {id = 22, name = "Health Plus Inc", address = "8001 Sunset Blvd", city = "Los Angeles", state="CA", postalCode="90046", fax = "(603) 214-8741", phone = "(603) 214-8741"},

        };

        public static readonly List<Product> Products = new List<Product> { 
            new Product { 
                id = 1, name = "Eco Max", description = "Low pollution industrial air cleaner.", 
                baseCost = 2400, listPrice = 2500, unitsInInventory = 289, unitsInManufactoring = 11,
                plant = "Harrisburg|188 Market Street|Harrisburg, VA 00098",
                pManager = "John Smith|188 Market Street|Harrisburg, VA 00098|(212) 555-2321|jsmith@harrisburg.com",
                sManager = "Jeff Hall|jeffh@harrisburg.com"
            },
            new Product { 
                id = 2, name = "Eco Supreme", description = "High-output air cleaner powered by solar.", 
                baseCost = 1850, listPrice = 2000, unitsInInventory = -14, unitsInManufactoring = 54,
                plant = "Las Vegas|1445 Las Vegas Blvd|Las Vegas, NV 89120",
                pManager = "Kent Hardy|1445 Las Vegas Blvd|Las Vegas, NV 89120|(702) 555-2321|khardy@lasvegas.com",
                sManager = "Brent Moffat|brentf@lasvegas.com"
            },
            new Product { 
                id = 3, name = "EnviroCare", description = "Consumer air filtration and vent system.", 
                baseCost = 1600, listPrice = 1750, unitsInInventory = 50, unitsInManufactoring = 40,
                plant = "Los Angeles|8247 Sunset Blvd|Los Angeles, CA 90020",
                pManager = "Jenny James|8247 Sunset Blvd|Los Angeles, CA 90020|(213) 555-2321|jennyj@losangeles.com",
                sManager = "Carter Smith|carterc@losangeles.com"
            },
            new Product { id = 4, name = "EnviroCare Max", description = "Industrial environmental control system.", 
                baseCost = 2700, listPrice = 2800, unitsInInventory = 150, unitsInManufactoring = 13,
                plant = "San Francisco|4242 Hill Street|San Francisco, CA 90311",
                pManager = "Dirk Porter|4242 Hill Street|San Francisco, CA 90311|(415) 555-2321|dirkp@sanfran.com",
                sManager = "Angela Vega|angelav@sanfran.com"
            },
            new Product { id = 5, name = "SolarOne", description = "Environmentally friendly power generation.", 
                baseCost = 1350, listPrice = 1500, unitsInInventory = 100, unitsInManufactoring = 14,
                plant = "New York|628 Broadway|New York, NY 00092",
                pManager = "Paul Heart|628 Broadway|New York, NY 00092|(212) 555-2321|paulh@nyc.com",
                sManager = "Karen McCarthy|karenm@nyc.com"
            },
            new Product { id = 6, name = "SolarMax", description = "Consumer targeted solar power cell.", 
                baseCost = 1150, listPrice = 2250, unitsInInventory = 67, unitsInManufactoring = 6,
                plant = "Atlanta|289 Olympic Road|Atlanta, GA 20092",
                pManager = "Mike Arthur|289 Olympic Road|Atlanta, GA 20092|(404) 555-2321|mikea@atl.com",
                sManager = "Robert Jones|robertj@atl.com"
            },
        };
    }


}