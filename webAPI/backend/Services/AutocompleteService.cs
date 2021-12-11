using System;
using System.Collections.Generic;
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
    public class AutocompleteService : IAutocompleteService
    {
        private readonly DbCon _dbCon;
        private readonly IMapper _mapper;
        public AutocompleteService(DbCon dbCon, IMapper mapper)
        {
            _dbCon = dbCon;
            _mapper = mapper;
        }
        public async Task<List<CityModel>> CityAutocomplete(AutocompleteModel autocompleteModel)
        {
            return _mapper.Map<List<CityModel>>(await _dbCon.Set<City>().Where(c => c.name.ToLower().Contains(autocompleteModel.Key))
                .Where(c => !autocompleteModel.ExistingIds.Contains(c.city_id)).ToListAsync()) ;
        }

        public async Task<List<ClubModel>> ClubAutocomplete(AutocompleteModel autocompleteModel)
        {
            return _mapper.Map<List<ClubModel>>(await _dbCon.Set<Club>().Where(c => c.name.ToLower().Contains(autocompleteModel.Key))
                .Where(c => !autocompleteModel.ExistingIds.Contains(c.club_id)).ToListAsync());
        }

        public async Task<List<SubjectModel>> SubjectAutocomplete(AutocompleteModel autocompleteModel)
        {
            return _mapper.Map<List<SubjectModel>>(await _dbCon.Set<Subject>().Where(s => s.name.ToLower().Contains(autocompleteModel.Key))
                .Where(s => !autocompleteModel.ExistingIds.Contains(s.subject_id)).ToListAsync());
        }

        public async Task<List<InterestModel>> InterestAutocomplete(AutocompleteModel autocompleteModel)
        {
            return _mapper.Map<List<InterestModel>>(await _dbCon.Set<Interest>().Where(i => i.name.ToLower().Contains(autocompleteModel.Key))
                .Where(i => !autocompleteModel.ExistingIds.Contains(i.interest_id)).ToListAsync());
        }

        public async Task<List<JobModel>> JobAutocomplete(AutocompleteModel autocompleteModel)
        {
            return _mapper.Map<List<JobModel>>(await _dbCon.Set<Job>().Where(j => j.name.ToLower().Contains(autocompleteModel.Key))
                .Where(j => !autocompleteModel.ExistingIds.Contains(j.job_id)).ToListAsync());
        }
    }
}
