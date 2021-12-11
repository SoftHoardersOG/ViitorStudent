using Microsoft.AspNetCore.Mvc;
using System;
using backend.IServices;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutocompleteController : ControllerBase
    {
        private readonly IAutocompleteService _autocompleteService;
        public AutocompleteController(IAutocompleteService autocompleteService)
        {
            _autocompleteService = autocompleteService;
        }

        [HttpPost]
        [Route("city")]
        public ActionResult CityAutocomplete([FromBody] AutocompleteModel autocompleteModel)
        {
            try
            {
                return Ok(_autocompleteService.CityAutocomplete(autocompleteModel).Result);
            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound("Error connecting to database!");
            }
        }  
        
        [HttpPost]
        [Route("job")]
        public ActionResult JobAutocomplete([FromBody] AutocompleteModel autocompleteModel)
        {
            try
            {
                return Ok(_autocompleteService.JobAutocomplete(autocompleteModel).Result);
            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound("Error connecting to database!");
            }
        }  
        
        [HttpPost]
        [Route("club")]
        public ActionResult ClubAutocomplete([FromBody] AutocompleteModel autocompleteModel)
        {
            try
            {
                return Ok(_autocompleteService.ClubAutocomplete(autocompleteModel).Result);
            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound("Error connecting to database!");
            }
        }  
        
        [HttpPost]
        [Route("interest")]
        public ActionResult InterestAutocomplete([FromBody] AutocompleteModel autocompleteModel)
        {
            try
            {
                return Ok(_autocompleteService.InterestAutocomplete(autocompleteModel).Result);
            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound("Error connecting to database!");
            }
        }  
        
        [HttpPost]
        [Route("subject")]
        public ActionResult SubjectAutocomplete([FromBody] AutocompleteModel autocompleteModel)
        {
            try
            {
                return Ok(_autocompleteService.SubjectAutocomplete(autocompleteModel).Result);
            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound("Error connecting to database!");
            }
        }
    }
}
