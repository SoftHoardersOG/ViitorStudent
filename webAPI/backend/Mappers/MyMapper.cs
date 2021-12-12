using System;
using System.Collections.Generic;
using System.Linq;
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
            CreateMap<University, UniversityCard>().ForMember(uc => uc.Id, u => u.MapFrom(o => o.university_id));
            CreateMap<User, UserModel>().ForMember(um => um.UserId, O => O.MapFrom(U => U.user_id))
                .ForMember(um => um.JoinDate, O => O.MapFrom(U => U.join_date)).ReverseMap();
            CreateMap<City, CityModel>().ForMember(cm => cm.Id, o => o.MapFrom(c => c.city_id)).ReverseMap();
            CreateMap<Job, JobModel>().ForMember(jm => jm.Id, o => o.MapFrom(j => j.job_id)).ReverseMap();
            CreateMap<Club, ClubModel>().ForMember(cm => cm.Id, o => o.MapFrom(c => c.club_id)).ReverseMap();
            CreateMap<Subject, SubjectModel>().ForMember(sm => sm.Id, o => o.MapFrom(s => s.subject_id)).ReverseMap();
            CreateMap<Interest, InterestModel>()
                .ForMember(im => im.Id, o => o
                    .MapFrom(i => i.interest_id))
                .ReverseMap();
            CreateMap<ReviewModel, Reviews>()
                .ForMember(r => r.user_id, o => o
                    .MapFrom(u => u.UserId))
                .ForMember(r=>r.university_id, o=>o
                    .MapFrom(rm=>rm.UniversityId));
            CreateMap<Reviews, ReviewModel>()
                .ForMember(rm => rm.UniversityId, o => o
                    .MapFrom(r => r.university_id))
                .ForMember(rm => rm.UserId, o => o
                    .MapFrom(r => r.user_id))
                .ForMember(r => r.UserUsername, o=>o
                    .MapFrom(rm=>rm.user.username)) 
                .ForMember(r => r.UserFirstName, o=>o
                    .MapFrom(rm=>rm.user.firstName)) 
                .ForMember(r => r.UserLastName, o=>o
                    .MapFrom(rm=>rm.user.lastName))
                ;
            CreateMap<University, ExtendedUniversityModel>()
                .ForMember(ext => ext.Id, o => o
                    .MapFrom(u => u.university_id))
                .ForMember(ext => ext.Reviews, o => o
                    .MapFrom(u => u.Reviews))
                .ReverseMap();
        }
    }
}