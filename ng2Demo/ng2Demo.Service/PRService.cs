using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ng2Demo.Data.Models;
using ng2Demo.Data.Repositories;
using ng2Demo.DTO;
using ng2Demo.Interface;
using an2Demo.Data;
using AutoMapper;

namespace ng2Demo.Service
{
    public class PRService : IPRService
    {
        private ng2DemoContext dbContext;
        private IPRRepository fPRRepository;

        public PRService(ng2DemoContext _dbContext, IPRRepository _PRRepository)
        {
            dbContext = _dbContext;
            fPRRepository = _PRRepository;
        }

        public IList<PRDTO> GetPagedList(string text, int page, int pageSize, out int total)
        {
            var lst = fPRRepository.GetAll();
            if (!string.IsNullOrEmpty(text))
            {
                text = text.Trim();
                lst = lst.Where(p => p.Deptment.Contains(text) || p.User.Contains(text) || p.Phone.Contains(text) || p.Supplier.Contains(text) || p.SupplierAddress.Contains(text));
            }

            lst = lst.OrderByDescending(p => p.ID);

            total = lst.Count();

            var lstresult = lst.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return Mapper.Map<List<PR>, List<PRDTO>>(lstresult);
        }

        public void Add(PRDTO dto)
        {
            try
            {
                var model = Mapper.Map<PRDTO, PR>(dto);
                model.CreateTime = DateTime.Now;
                fPRRepository.Add(model);
                dbContext.SaveChanges();
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException ex)
            {
                throw;
            }
        }

        public void Update(PRDTO dto)
        {
            var model = fPRRepository.Get(p => p.ID == dto.ID);

            model.Deptment = dto.Deptment;
            model.User = dto.User;
            model.Phone = dto.Phone;
            model.IsPrePay = dto.IsPrePay;
            model.Supplier = dto.Supplier;
            model.SupplierAddress = dto.SupplierAddress;
            model.Total = dto.Total;

            if (dto.Items != null && dto.Items.Count > 0)
            {
                var items = model.Items;
                var delItems = model.Items.Where(p => !dto.Items.Any(x => x.ID == p.ID)).ToList();
                foreach (var newitem in dto.Items)
                {
                    var dbitem = items.FirstOrDefault(p => p.ID == newitem.ID);
                    if (dbitem == null)
                    {
                        dbitem = new PRItem();
                        dbitem.PRID = model.ID;
                        model.Items.Add(dbitem);
                    }
                    dbitem.Name = newitem.Name;
                    dbitem.Price = newitem.Price;
                    dbitem.Count = newitem.Count;
                    dbitem.Amount = newitem.Amount;
                    dbitem.Remark = newitem.Remark;
                }
            }
            else
            {
                model.Items.Clear();
            }

            dbContext.SaveChanges();
        }

        public void Delete(int ID)
        {
            fPRRepository.Delete(p => p.ID == ID);
            dbContext.SaveChanges();
        }
        
        public PRDTO GetByID(int ID)
        {
            var model = fPRRepository.GetIncluceItems(p => p.ID == ID);
            return Mapper.Map<PR, PRDTO>(model);
        }

        public IList<PRDTO> GetAll()
        {
            var lst = fPRRepository.GetAll().ToList();
            return Mapper.Map<List<PR>, List<PRDTO>>(lst);
        }

    }
}
