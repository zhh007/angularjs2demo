using ng2Demo.DTO;
using ng2Demo.Interface;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
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
        public PRListResponse List([FromBody]PRListRequest req)
        {
            PRListResponse resp = new PRListResponse();
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

        [HttpPost]
        public GetSupplierResponse GetSupplierList()
        {
            GetSupplierResponse resp = new GetSupplierResponse();

            resp.List.Add(new NameValueItem { Name = "华为", Value = "huawei" });
            resp.List.Add(new NameValueItem { Name = "OPPO", Value = "oppo" });//Add("OPPO", "oppo");
            resp.List.Add(new NameValueItem { Name = "VIVO", Value = "vivo" });//Add("VIVO", "vivo");
            resp.List.Add(new NameValueItem { Name = "小米", Value = "mi" });//Add("小米", "mi");
            resp.List.Add(new NameValueItem { Name = "魅族", Value = "meizu" });//Add("魅族", "meizu");

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

    public class PRListResponse
    {
        public int PageIndex { get; set; }

        public int Total { get; set; }

        public IList<PRDTO> List { get; set; }

        public PRListResponse()
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

    public class GetSupplierResponse
    {
        public List<NameValueItem> List { get; set; }
        public GetSupplierResponse()
        {
            List = new List<PR.NameValueItem>();
        }
    }

    public class NameValueItem
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    //public class PermExpandResult
    //{
    //    public List<PermScopeItem> Scopes { get; set; }
    //    public List<PermScopeItemOperation> Operations { get; set; }
    //}

    //public class PermScopeItem
    //{
    //    public string ScopeId { get; set; }
    //    public string ScopeName { get; set; }
    //    public string ParentId { get; set; }
    //}

    //public class PermScopeItemOperation
    //{
    //    public string Name { get; set; }
    //    /// <summary>
    //    /// 跟PermValue对应，如菜单中定义的编辑权限值是2，这里也应该设置为2
    //    /// </summary>
    //    public long Value { get; set; }
    //}
}
