using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class Order
    {
        public int id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public System.Guid ProductId { get; set; }
        public System.DateTime OrderCreationDate { get; set; }
        public int size { get; set; }
        public bool status { get; set; }
        public virtual product product { get; set; }
    }
}
