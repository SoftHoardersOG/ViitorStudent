using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Models;

namespace backend.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly DbCon _dbCon;
        private readonly IMapper _mapper;

        public RegisterService(DbCon dbCon, IMapper mapper)
        {
            _dbCon = dbCon;
            _mapper = mapper;
        }

        private bool CanRegister(UserModel userModel)
        {
            return _dbCon.Set<User>().SingleOrDefault(u => u.username == userModel.username) == null;
        }

        public bool Register(UserModel userModel)
        {
            if (!CanRegister(userModel)) return false;
            _dbCon.Add(_mapper.Map<User>(userModel));
            _dbCon.SaveChanges();
            return true;
        }
    }
}