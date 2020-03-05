using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class EmailSetting
    {
        public int id { get; set; }
        public string eMail { get; set; }
        public string password { get; set; }
        public string Host { get; set; }
        public bool EnableSsl { get; set; }
        public int Port { get; set; }
        public bool UseDefaultCredentials { get; set; }
        public string EmailMailName { get; set; }
    }
}
