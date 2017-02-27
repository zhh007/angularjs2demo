using AutoMapper;
using ng2Demo.Data.Models;
using ng2Demo.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ng2Demo.Service
{
    public class AutoMapperCreator : Profile
    {
        public AutoMapperCreator()
        {
            CreateMap<PR, PRDTO>();
            CreateMap<PRDTO, PR>();

            CreateMap<PRItem, PRItemDTO>();
            CreateMap<PRItemDTO, PRItem>();
        }
    }
}
