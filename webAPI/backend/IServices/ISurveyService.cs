using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.IServices
{
    public interface ISurveyService
    {
        Task<SurveyModel> AddSurveyToUser(SurveyModel survey);
        Task<List<CityModel>> GetCities();
        Task<List<ClubModel>> GetClubs();
        Task<List<JobModel>> GetJobs();
        Task<List<SubjectModel>> GetSubjects();
        Task<List<InterestModel>> GetInterests();
        Task<string> DeleteSurvey(string username);
    }
}
