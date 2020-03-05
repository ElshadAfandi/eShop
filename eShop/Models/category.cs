using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class category
    {
        public category()
        {
            this.Images = new List<Image>();
            this.products = new List<product>();
        }

        public int id { get; set; }
        public string CategoryName { get; set; }
        public string description { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<product> products { get; set; }
    }
}
