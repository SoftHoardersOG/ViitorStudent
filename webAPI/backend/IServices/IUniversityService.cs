using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.IServices
{
    public interface IUniversityService
    {
        Task<List<UniversityCard>> GetAllCards();
        Task<int> GetUniversityCount();
        Task<List<UniversityCard>> GetUniversityFrom(int fromCount, int universityAmount);
        Task<ExtendedUniversityModel> GetExtendedUniversity(int id);
        Task<ReviewModel> PostReview(ReviewModel review);
    }

}
