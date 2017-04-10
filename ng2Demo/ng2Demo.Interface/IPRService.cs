using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ng2Demo.DTO;

namespace ng2Demo.Interface
{
    public interface IPRService
    {
        IList<PRDTO> GetAll();
        PRDTO GetByID(int ID);
        IList<PRDTO> GetPagedList(string text, int page, int pageSize, out int total);

        void Add(PRDTO dto);
        void Update(PRDTO dto);
        void Delete(int ID);


    }
}
