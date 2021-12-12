using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.IServices;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService _surveyService;
        public SurveyController(ISurveyService surveyService)
        {
            _surveyService = surveyService;
        }

        [Authorize]
        [HttpDelete("Survey")]
        public ActionResult DeleteSurvey()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var username = identity.FindFirst("username")?.Value;
                if (username != " ")
                {
                    
                    return Ok(new {
                        key=_surveyService.DeleteSurvey(username).Result
                    });
                }

                return Ok(new{key = "none" });
            }

            return Ok(new { key = "none" });
        }

        [HttpPost("Survey")]
        public ActionResult PostUserSurvey(SurveyModel survey)
        {
            return Ok(_surveyService.AddSurveyToUser(survey).Result);
        }

        [HttpGet("cities")]
        public ActionResult GetCities()
        {
            try
            {
                return Ok(_surveyService.GetCities().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Failed to connect do database!");
            }
        }      
        
        [HttpGet("clubs")]
        public ActionResult GetClubs()
        {
            try
            {
                return Ok(_surveyService.GetClubs().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Failed to connect do database!");
            }
        }  
        
        [HttpGet("interests")]
        public ActionResult GetInterests()
        {
            try
            {
                return Ok(_surveyService.GetInterests().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Failed to connect do database!");
            }
        }      
        
        [HttpGet("jobs")]
        public ActionResult GetJobs()
        {
            try
            {
                return Ok(_surveyService.GetJobs().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Failed to connect do database!");
            }
        }
        
        [HttpGet("subjects")]
        public ActionResult GetSubjects()
        {
            try
            {
                return Ok(_surveyService.GetSubjects().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Failed to connect do database!");
            }
        }

        




    }
}
