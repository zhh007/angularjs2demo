using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ng2Demo.Data.Models;
using APP.Infrastructure.Data;
using an2Demo.Data;
using System.Linq.Expressions;
using System.Data.Entity;

namespace ng2Demo.Data.Repositories
{
    public class PRRepository : RepositoryBase<PR>, IPRRepository
    {
        public PRRepository(ng2DemoContext context)
            : base(context)
        {

        }

        public PR GetIncluceItems(Expression<Func<PR, bool>> where)
        {
            return DataContext.Set<PR>()
                .Include(path => path.Items).Where(where).FirstOrDefault();
        }
    }

    public interface IPRRepository : IRepository<PR>
    {
        PR GetIncluceItems(Expression<Func<PR, bool>> where);
    }
}
