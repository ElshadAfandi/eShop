using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class User
    {
        public System.Guid id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public System.DateTime Brithday { get; set; }
        public string Phone { get; set; }
        public virtual aspnet_Membership aspnet_Membership { get; set; }
    }
}
