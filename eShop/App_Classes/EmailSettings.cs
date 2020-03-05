using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eShop.App_Classes
{
    public class EmailSettings
    {
        public int id { get; set; }
        public string eMail { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public bool EnableSsl { get; set; }
        public int Port { get; set; }
        public bool UseDefaultCredentials { get; set; }
        public string EmailMailName { get; set; }
    }
}