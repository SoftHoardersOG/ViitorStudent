using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.IServices;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SortingFilterController : ControllerBase
    {
        private readonly ISortFilterService _sortFilterService;
        public SortingFilterController(ISortFilterService sortFilterService)
        {
            _sortFilterService = sortFilterService;
        }
        [HttpPost]
        public ActionResult GetSorted(SortingAndSurveyModel sortingAndSurvey)
        {
            SurveyModel surveyModel = sortingAndSurvey.surveyModel;
            SortFilterModel sortModel = sortingAndSurvey.sortFilterModel;
            try
            {
                if (
                    !surveyModel.InterestIds.Any() && !surveyModel.CityIds.Any()
                                                   && !surveyModel.JobIds.Any() && !surveyModel.ClubIds.Any()
                                                   && !surveyModel.SubjectIds.Any()
                )
                {
                    return Ok(_sortFilterService.Filter(sortModel).Result);
                }
                return Ok(_sortFilterService.Filter(sortModel,surveyModel).Result);
            }
            catch (Exception e)
            {
                 Console.WriteLine(e);
                 return NotFound("No results");
            }
        }
    }
}
