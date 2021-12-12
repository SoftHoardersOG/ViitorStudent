using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SortFilterService : ISortFilterService
    {
        private readonly DbCon _dbCon;
        private readonly IMapper _mapper;

        public SortFilterService(DbCon dbCon, IMapper mapper)
        {
            _dbCon = dbCon;
            _mapper = mapper;
        }

        public async Task<List<University>> Filter(SortFilterModel model, int startingPoint,int maxNumber,SurveyModel surveyModel=null)
        {
            var result = (model.SortingType == "ascending")
                ? _dbCon.Set<University>().OrderBy(u => u.name).AsQueryable()
                : _dbCon.Set<University>().OrderByDescending(u => u.name).AsQueryable();

            if (surveyModel != null)
            {
                if (surveyModel.SubjectIds.Any())
                {
                    result = result
                        .Where(u => u.UniversitySubject.Any(uc => surveyModel.SubjectIds.Contains(uc.subject_id)))
                        .AsQueryable();
                }

                if (surveyModel.JobIds.Any())
                {
                    result = result
                        .Where(u => u.UniversityJob.Any(uc => surveyModel.JobIds.Contains(uc.job_id)))
                        .AsQueryable();
                }

                if (surveyModel.CityIds.Any())
                {
                    result = result
                        .Where(u => surveyModel.CityIds.Contains(u.city_id))
                        .AsQueryable();
                }

                if (surveyModel.ClubIds.Any())
                {
                    result = result.
                        Where(u => u.UniversityClub.Any(uc => surveyModel.ClubIds.Contains(uc.club_id)))
                        .AsQueryable();
                }
                if (surveyModel.InterestIds.Any())
                {
                    result = result.
                        Where(u => u.UniversityInterest.Any(uc => surveyModel.InterestIds.Contains(uc.interest_id)))
                        .AsQueryable();
                }

            }


            if (model.Cities.Any())
            {
                result = result.Where(u => model.Cities.Contains(u.city_id)).AsQueryable();
            }

            if (model.Subjects.Any())
            {
                result = result.Where(u => u.UniversitySubject.Any(uc => model.Subjects.Contains(uc.subject_id))).AsQueryable();
            }

            result = result.Skip(startingPoint).Take(maxNumber);

            return await result.ToListAsync();
        }

        public async Task<SurveyModel> GenerateSurvey(int userId)
        {
            var result= new SurveyModel
            {
                UserId = userId,
                CityIds = await _dbCon.Set<UserCity>().Where(u => u.user_id == userId).Select(t => t.city_id).ToListAsync(),
                InterestIds = await _dbCon.Set<UserInterest>().Where(u => u.user_id == userId).Select(t=> t.interest_id).ToListAsync(),
                SubjectIds = await _dbCon.Set<UserSubject>().Where(u => u.user_id == userId).Select(t => t.subject_id).ToListAsync(),
                ClubIds = await _dbCon.Set<UserClub>().Where(u => u.user_id == userId).Select(t => t.club_id).ToListAsync(),
                JobIds = await _dbCon.Set<UserJob>().Where(u => u.user_id == userId).Select(t => t.job_id).ToListAsync()
            };
            if (!result.CityIds.Any() && !result.InterestIds.Any() && !result.SubjectIds.Any() &&
                !result.ClubIds.Any() && !result.JobIds.Any())
            {
                return null;
            }

            return result;
        }
    }
}