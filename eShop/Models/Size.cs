using System;
using System.Collections.Generic;

namespace eShop.Models
{
    public partial class Size
    {
        public int id { get; set; }
        public Nullable<int> Size1 { get; set; }
        public System.Guid ProductId { get; set; }
        public virtual product product { get; set; }
    }
}
