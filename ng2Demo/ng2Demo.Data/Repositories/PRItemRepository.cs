using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ng2Demo.Data.Models;
using APP.Infrastructure.Data;
using an2Demo.Data;

namespace ng2Demo.Data.Repositories
{
    public class PRItemRepository : RepositoryBase<PRItem>, IPRItemRepository
    {
        public PRItemRepository(ng2DemoContext context)
            : base(context)
        {

        }
    }

    public interface IPRItemRepository : IRepository<PRItem>
    {

    }
}
