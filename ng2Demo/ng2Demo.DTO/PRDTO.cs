using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ng2Demo.DTO
{
    public class PRDTO
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

        public List<PRItemDTO> Items { get; set; }

        public PRDTO()
        {
            this.Items = new List<PRItemDTO>();
        }
    }
    
}

