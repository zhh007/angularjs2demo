using ng2Demo.DTO;
using ng2Demo.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ng2Demo.WebApi.PR
{
    public class PRController : ApiController
    {
        private IPRService PRService;

        public PRController(IPRService prService)
        {
            PRService = prService;
        }

        [HttpPost]
        public PRListRsponse List([FromBody]PRListRequest req)
        {
            PRListRsponse resp = new PRListRsponse();
            resp.PageIndex = req.PageIndex;

            int total = 0;
            var list = PRService.GetPagedList("", req.PageIndex, 10, out total);

            resp.List = list;
            resp.Total = total;

            //int begin = ((req.PageIndex - 1) * req.PageSize);
            //int end = begin + req.PageSize;
            //for (int i = begin; i < end; i++)
            //{
            //    PRDTO pr = new PRDTO();
            //    pr.ID = i;
            //    pr.Deptment = "研发" + i;
            //    pr.User = "张三" + i;
            //    pr.Phone = "13055556666";
            //    pr.CreateTime = DateTime.Now;
            //    pr.IsPrePay = false;
            //    pr.Supplier = "杭州制造企业";
            //    pr.SupplierAddress = "杭州西湖";
            //    pr.Total = 10000;
            //    resp.List.Add(pr);
            //}

            return resp;
        }

        [HttpPost]
        public PRAddResponse Add([FromBody]PRAddRequest req)
        {
            PRAddResponse resp = new PRAddResponse();

            return resp;
        }




    }

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

        public IList<PRDTO> List { get; set; }

        public PRListRsponse()
        {
            this.List = new List<PRDTO>();
        }
    }

    public class PRAddRequest : PRDTO
    {

    }

    public class PRAddResponse
    {

    }
}
