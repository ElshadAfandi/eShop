using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class productMap : EntityTypeConfiguration<product>
    {
        public productMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.ProductName)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.Description)
                .HasMaxLength(500);

            this.Property(t => t.Manufacturer)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ProductCode)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("product");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.ProductName).HasColumnName("ProductName");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.DiscountedPrice).HasColumnName("DiscountedPrice");
            this.Property(t => t.Discount).HasColumnName("Discount");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");
            this.Property(t => t.Manufacturer).HasColumnName("Manufacturer");
            this.Property(t => t.ProductCode).HasColumnName("ProductCode");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");

            // Relationships
            this.HasRequired(t => t.category)
                .WithMany(t => t.products)
                .HasForeignKey(d => d.CategoryId);

        }
    }
}
