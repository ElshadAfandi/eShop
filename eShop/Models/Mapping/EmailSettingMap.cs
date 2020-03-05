using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace eShop.Models.Mapping
{
    public class EmailSettingMap : EntityTypeConfiguration<EmailSetting>
    {
        public EmailSettingMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.eMail)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.password)
                .IsRequired();

            this.Property(t => t.Host)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.EmailMailName)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("EmailSetting");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.eMail).HasColumnName("eMail");
            this.Property(t => t.password).HasColumnName("password");
            this.Property(t => t.Host).HasColumnName("Host");
            this.Property(t => t.EnableSsl).HasColumnName("EnableSsl");
            this.Property(t => t.Port).HasColumnName("Port");
            this.Property(t => t.UseDefaultCredentials).HasColumnName("UseDefaultCredentials");
            this.Property(t => t.EmailMailName).HasColumnName("EmailMailName");
        }
    }
}
