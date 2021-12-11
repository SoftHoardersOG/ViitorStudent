using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> CanRegister(string username)
        {
         var user = await _dbCon.Set<User>().FirstOrDefaultAsync(u => u.username == username);
            return user == null;
        }

        public async Task<bool> Register(RegistrationModel registrationModel)
        {
            if (!CanRegister(registrationModel.Username).Result) return false;
            await _dbCon.AddAsync(_mapper.Map<User>(registrationModel));
            await _dbCon.SaveChangesAsync();
            return true;
        }
    }
}