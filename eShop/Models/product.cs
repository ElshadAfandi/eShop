using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eShop.Models
{
    public partial class product
    {
        public product()
        {
            this.Images = new List<Image>();
            this.Orders = new List<Order>();
            this.Sizes = new List<Size>();
        }

        public System.Guid id { get; set; }
        [Display(Name = "Məhsulun adı")]
        public string ProductName { get; set; }
        [Display(Name = "Açıqlama")]
        public string Description { get; set; }
        [Display(Name = "Qiymət")]
        public decimal Price { get; set; }
        [Display(Name = "Endirimli qiymət")]
        public Nullable<decimal> DiscountedPrice { get; set; }
        [Display(Name = "Endirim")]
        public Nullable<short> Discount { get; set; }
        [Display(Name = "Yerləşdirilmə zamanı")]
        public System.DateTime CreatedDate { get; set; }
        [Display(Name = "İstehsalçı")]
        public string Manufacturer { get; set; }
        [Display(Name = "Məhsulun kodu")]
        public string ProductCode { get; set; }
        [Display(Name = "Kateqoriya")]
        public int CategoryId { get; set; }
        [Display(Name = "Kateqoriya")]
        public virtual category category { get; set; }
        [Display(Name = "Rəsmlər")]
        public virtual ICollection<Image> Images { get; set; }
        [Display(Name = "Sifarişlər")]
        public virtual ICollection<Order> Orders { get; set; }
        [Display(Name = "Ölçülər")]
        public virtual ICollection<Size> Sizes { get; set; }

    }
}
