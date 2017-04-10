using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRService.Models
{
    public class PRListRequest
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }

        public PRListRequest()
        {
            this.PageIndex = 1;
            this.PageSize = 10;
        }
    }

    public class PRListRsponse
    {
        public int PageIndex { get; set; }

        public int Total { get; set; }

        public List<PRModel> List { get; set; }

        public PRListRsponse()
        {
            this.List = new List<Models.PRModel>();
        }
    }


}