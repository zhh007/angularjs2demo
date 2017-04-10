using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ng2Demo.Data.Models.Mapping
{
    public class PRMap : EntityTypeConfiguration<PR>
    {
        public PRMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(t => t.Deptment)
                .HasMaxLength(50)
                .IsRequired();
            this.Property(t => t.User)
                .HasMaxLength(50)
                .IsRequired();
            this.Property(t => t.Phone)
                .HasMaxLength(50)
                .IsRequired();
            this.Property(t => t.IsPrePay)
                .IsRequired();
            this.Property(t => t.Supplier)
                .HasMaxLength(50)
                .IsRequired();
            this.Property(t => t.SupplierAddress)
                .HasMaxLength(100)
                .IsRequired();
            this.Property(t => t.Total)
                .IsRequired();
            this.Property(t => t.CreateTime)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("PR");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.Deptment).HasColumnName("Deptment");
            this.Property(t => t.User).HasColumnName("User");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.IsPrePay).HasColumnName("IsPrePay");
            this.Property(t => t.Supplier).HasColumnName("Supplier");
            this.Property(t => t.SupplierAddress).HasColumnName("SupplierAddress");
            this.Property(t => t.Total).HasColumnName("Total");
            this.Property(t => t.CreateTime).HasColumnName("CreateTime");

            // Relationships
            //this.HasOptional(t => t.ModifyUser)
            //    .WithMany(t => t.ModifyPRs)
            //    .HasForeignKey(d => d.ModifyUserID);
        }
    }
}
