using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class SizeMap : EntityTypeConfiguration<Size>
    {
        public SizeMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            // Table & Column Mappings
            this.ToTable("Size");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.Size1).HasColumnName("Size");
            this.Property(t => t.ProductId).HasColumnName("ProductId");

            // Relationships
            this.HasRequired(t => t.product)
                .WithMany(t => t.Sizes)
                .HasForeignKey(d => d.ProductId);

        }
    }
}
