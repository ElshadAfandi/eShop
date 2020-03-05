using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class ImageMap : EntityTypeConfiguration<Image>
    {
        public ImageMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.CategoryImage)
                .HasMaxLength(800);

            this.Property(t => t.ProductImage)
                .HasMaxLength(800);

            // Table & Column Mappings
            this.ToTable("Image");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.CategoryImage).HasColumnName("CategoryImage");
            this.Property(t => t.ProductImage).HasColumnName("ProductImage");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.ProductId).HasColumnName("ProductId");

            // Relationships
            this.HasOptional(t => t.category)
                .WithMany(t => t.Images)
                .HasForeignKey(d => d.CategoryId);
            this.HasOptional(t => t.product)
                .WithMany(t => t.Images)
                .HasForeignKey(d => d.ProductId);

        }
    }
}
