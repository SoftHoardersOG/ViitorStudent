using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.IServices
{
    public interface ISortFilterService
    {
        Task<List<University>> Filter(SortFilterModel model, SurveyModel surveyModel = null);
    }
}
