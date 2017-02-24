using PRService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PRService.Controllers
{
    public class PRController : ApiController
    {
        [HttpPut]
        public PRListRsponse List(PRListRequest req)
        {
            PRListRsponse resp = new Models.PRListRsponse();
            resp.PageIndex = req.PageIndex;
            resp.Total = 100;

            int begin = ((req.PageIndex - 1) * req.PageSize);
            int end = begin + req.PageSize;
            for (int i = begin; i < end; i++)
            {
                PRModel pr = new PRModel();
                pr.ID = i;
                pr.Deptment = "研发" + i;
                pr.User = "张三" + i;
                pr.Phone = "13055556666";
                pr.CreateTime = DateTime.Now.ToString();
                pr.IsPrePay = false;
                pr.Supplier = "杭州制造企业";
                pr.SupplierAddress = "杭州西湖";
                pr.Total = 10000;
                resp.List.Add(pr);
            }

            return resp;
        }

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}