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

        public async Task<ReviewModel> PostReview(ReviewModel review)
        {
            _dbCon.Set<Reviews>().Add(_mapper.Map<Reviews>(review));
            await _dbCon.SaveChangesAsync();
            return review;
        }

        public async Task<ExtendedUniversityModel> GetExtendedUniversity(int id)
        {
            return _mapper.Map<ExtendedUniversityModel>(await _dbCon.Set<University>()
                .Include(u => u.Reviews)
                .FirstOrDefaultAsync(u => u.university_id == id));
        }

        public async Task<int> GetUniversityCount()
        {
            return await _dbCon.University.CountAsync();
        }

        public async Task<List<UniversityCard>> GetUniversityFrom(int fromCount,int universityAmount)
        {
            var result = await _dbCon.Set<University>().Skip(fromCount).Take(universityAmount).ToListAsync();
            return _mapper.Map<List<UniversityCard>>(result);
        }

    }
}
