using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UniversityService : IUniversityService
    {
        private readonly DbCon _dbCon;
        private readonly IMapper _mapper;
        public UniversityService(DbCon dbCon,IMapper mapper)
        {
            _dbCon = dbCon;
            _mapper = mapper;
        }
        public async Task<List<UniversityCard>> GetAllCards()
        {
            var result = await _dbCon.Set<University>().OrderBy(u => u.university_id).ToListAsync();
            return _mapper.Map<List<UniversityCard>>(result);
        }

        public async Task<int> GetUniversityCount()
        {
            return await _dbCon.University.CountAsync();
        }

        public async Task<List<UniversityCard>> GetUniversityFrom(int fromCount)
        {
            var result = await _dbCon.Set<University>().Skip(fromCount).Take(6).ToListAsync();
            return _mapper.Map<List<UniversityCard>>(result);
        }

    }
}
