using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRService.Models
{
    public class PRModel
    {
        public int ID { get; set; }
        public string Deptment { get; set; }
        public string User { get; set; }
        public string Phone { get; set; }
        public string CreateTime { get; set; }
        public bool IsPrePay { get; set; }
        public string Supplier { get; set; }
        public string SupplierAddress { get; set; }
        public decimal Total { get; set; }
        public List<PRItemModel> Items { get; set; }

        public PRModel()
        {
            this.Items = new List<Models.PRItemModel>();
        }
    }

    public class PRItemModel
    {
        public int ID { get; set; }
        public int PRID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
        public decimal Amount { get; set; }
        public string Remark { get; set; }
    }

    public class PRAddRequest : PRModel
    {

    }

    public class PRAddResponse
    {

    }
}