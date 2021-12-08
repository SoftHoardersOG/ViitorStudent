using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Entities;
using backend.Models;

namespace backend.Mappers
{
    public class MyMapper : Profile
    {
        public MyMapper()
        {
            CreateMap<RegistrationModel, User>().ForMember(u => u.role,
                    o => o.MapFrom(um => "student"))
                .ForMember(u => u.join_date, o => o.MapFrom(um => DateTime.Now))
                ; 
            CreateMap<User, RegistrationModel>();
        }
    }
}