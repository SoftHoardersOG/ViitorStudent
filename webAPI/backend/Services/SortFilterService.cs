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

        public async Task<List<University>> Filter(SortFilterModel model, SurveyModel surveyModel=null)
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

            
            return await result.ToListAsync();
        }
    }
}