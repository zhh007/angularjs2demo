using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ng2Demo.Data.Models
{
    public partial class PR
    {
        /// <summary>
        /// 
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Deptment { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string User { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsPrePay { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Supplier { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SupplierAddress { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public decimal Total { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DateTime CreateTime { get; set; }

        public virtual ICollection<PRItem> Items { get; set; }

        public PR()
        {
            this.Items = new List<PRItem>();
        }
    }
}

