using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Entities;
using backend.IServices;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SortingFilterController : ControllerBase
    {
        private readonly ISortFilterService _sortFilterService;
        private readonly ILoginService _loginService;
        public SortingFilterController(ISortFilterService sortFilterService,ILoginService loginService)
        {
            _sortFilterService = sortFilterService;
            _loginService = loginService;
        }

        [HttpGet]
        [Route("survey")]
        [Authorize]
        public ActionResult GetSurveyModel()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var username = identity.FindFirst("username")?.Value;
                if (username == " ")
                {
                    return NotFound("User is not logged in!");
                }
                
                return Ok(_sortFilterService.GenerateSurvey(_loginService.GetUser(username).Result.user_id).Result);
            }
            return NotFound("User is not logged in!");
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
                    return Ok(_sortFilterService.Filter(sortModel,sortingAndSurvey.startingPoint,sortingAndSurvey.maxNumber).Result);
                }
                return Ok(_sortFilterService.Filter(sortModel, sortingAndSurvey.startingPoint, sortingAndSurvey.maxNumber,surveyModel).Result);
            }
            catch (Exception e)
            {
                 Console.WriteLine(e);
                 return NotFound("No results");
            }
        }
    }
}
