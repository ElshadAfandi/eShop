using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class OrderMap : EntityTypeConfiguration<Order>
    {
        public OrderMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.LastName)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.Phone)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.Email)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Order");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.ProductId).HasColumnName("ProductId");
            this.Property(t => t.OrderCreationDate).HasColumnName("OrderCreationDate");
            this.Property(t => t.size).HasColumnName("size");
            this.Property(t => t.status).HasColumnName("status");

            // Relationships
            this.HasRequired(t => t.product)
                .WithMany(t => t.Orders)
                .HasForeignKey(d => d.ProductId);

        }
    }
}
