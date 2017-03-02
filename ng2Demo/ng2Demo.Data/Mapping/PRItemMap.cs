using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ng2Demo.Data.Models.Mapping
{
    public class PRItemMap : EntityTypeConfiguration<PRItem>
    {
        public PRItemMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(t => t.PRID)
                .IsRequired();
            this.Property(t => t.Name)
                .HasMaxLength(50)
                .IsRequired();
            this.Property(t => t.Price)
                .IsRequired();
            this.Property(t => t.Count)
                .IsRequired();
            this.Property(t => t.Amount)
                .IsRequired();
            this.Property(t => t.Remark)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("PRItem");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.PRID).HasColumnName("PRID");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.Count).HasColumnName("Count");
            this.Property(t => t.Amount).HasColumnName("Amount");
            this.Property(t => t.Remark).HasColumnName("Remark");

            // Relationships
            this.HasRequired(t => t.Parent)
                .WithMany(t => t.Items)
                .HasForeignKey(d => d.PRID);
        }
    }
}
