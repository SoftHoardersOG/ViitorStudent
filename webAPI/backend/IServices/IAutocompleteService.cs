using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.IServices
{
    public interface IAutocompleteService
    {
        Task<List<CityModel>> CityAutocomplete(AutocompleteModel autocompleteModel);
        Task<List<ClubModel>> ClubAutocomplete(AutocompleteModel autocompleteModel);
        Task<List<SubjectModel>> SubjectAutocomplete(AutocompleteModel autocompleteModel);
        Task<List<InterestModel>> InterestAutocomplete(AutocompleteModel autocompleteModel);
        Task<List<JobModel>> JobAutocomplete(AutocompleteModel autocompleteModel);
    }
}
