using ng2Demo.Data.Models;
using ng2Demo.Data.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace an2Demo.Data
{
    public class ng2DemoContext : DbContext, IDisposable
    {
        static ng2DemoContext()
        {
            Database.SetInitializer<ng2DemoContext>(null);
        }

        public ng2DemoContext()
            : base("Name=ng2DemoContext")
        {
        }

        public DbSet<PR> PRs { get; set; }
        public DbSet<PRItem> PRItems { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new PRMap());
            modelBuilder.Configurations.Add(new PRItemMap());
        }
    }
}
