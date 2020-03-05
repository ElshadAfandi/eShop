using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class GeneralMap : EntityTypeConfiguration<General>
    {
        public GeneralMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.wpLink)
                .HasMaxLength(70);

            this.Property(t => t.bgImage)
                .HasMaxLength(100);

            this.Property(t => t.eMail)
                .HasMaxLength(70);

            this.Property(t => t.Phone)
                .HasMaxLength(70);

            this.Property(t => t.insLink)
                .HasMaxLength(70);

            this.Property(t => t.fbLink)
                .HasMaxLength(70);

            this.Property(t => t.MailName)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("General");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.wpLink).HasColumnName("wpLink");
            this.Property(t => t.bgImage).HasColumnName("bgImage");
            this.Property(t => t.eMail).HasColumnName("eMail");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.address).HasColumnName("address");
            this.Property(t => t.insLink).HasColumnName("insLink");
            this.Property(t => t.fbLink).HasColumnName("fbLink");
            this.Property(t => t.mapApiKey).HasColumnName("mapApiKey");
            this.Property(t => t.FooterText).HasColumnName("FooterText");
            this.Property(t => t.MailName).HasColumnName("MailName");
        }
    }
}
