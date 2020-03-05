using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class Image
    {
        public int id { get; set; }
        public string CategoryImage { get; set; }
        public string ProductImage { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<System.Guid> ProductId { get; set; }
        public virtual category category { get; set; }
        public virtual product product { get; set; }
    }
}
