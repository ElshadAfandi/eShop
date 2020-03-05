using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eShop.App_Classes
{
    public class ModalOrderList
    {
        public int id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string ProductCode { get; set; }
        public int Size { get; set; }
    }
}