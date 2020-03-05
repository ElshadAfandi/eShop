using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eShop.App_Classes
{
    public class ForEditProduct
    {   
        public  int CatId { get; set; }
        public string CatName { get; set; }
        public System.Guid productid { get; set; }
        public string ProductName { get; set; }
        public string description { get; set; }
        public string productcode { get; set; }
        public string manufacturer { get; set; }
        public decimal price { get; set; }
    }
}