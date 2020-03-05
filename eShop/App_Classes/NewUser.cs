using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eShop.App_Classes
{
    public class NewUser
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
        public DateTime Brithday { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string SecurityQuestion { get; set; }
        public string SecurityAnswer { get; set; }
    }
}