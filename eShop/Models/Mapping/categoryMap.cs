using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class categoryMap : EntityTypeConfiguration<category>
    {
        public categoryMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.CategoryName)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.description)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("category");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.CategoryName).HasColumnName("CategoryName");
            this.Property(t => t.description).HasColumnName("description");
        }
    }
}
