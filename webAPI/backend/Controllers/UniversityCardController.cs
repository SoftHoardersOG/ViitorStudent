using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.IServices;
using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversityCardController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IUniversityService _universityService;
        public UniversityCardController(IImageService imageService,IUniversityService universityService)
        {
            _imageService = imageService;
            _universityService = universityService;
        }
            
        [HttpGet]
        [Route("/api/images")]
        public ActionResult GetImage([FromQuery]int universityId)
        {
            var img = _imageService.FindImage(universityId, this);
            return img == null ? NotFound("image doesn't exist") : img;
        }

        [HttpGet]
        [Route("${id}")]
        public ActionResult GetExtendedUniversity( int id)
        {
            try
            {
                return Ok(_universityService.GetExtendedUniversity(id).Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("Error trying to connect to database!");
                
            }
        }

        [HttpPost]
        [Route("review")]
        public ActionResult PostReview([FromBody] ReviewModel review)
        {
            try
            {
                return Ok(_universityService.PostReview(review).Result);
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                return NotFound("Error when trying to post!");
            }
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            try
            {
                return Ok(_universityService.GetAllCards().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("universities not found");
            }
        }
        [HttpGet]
        [Route("count")]
        public ActionResult GetCount()
        {
            try
            {
                return Ok(_universityService.GetUniversityCount().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("universities table not found");
            }
        }
        [HttpGet]
        [Route("lazy")]
        public ActionResult GetFrom([FromQuery] int loadFrom,[FromQuery]int universityAmount)
        {
            try
            {
                return Ok(_universityService.GetUniversityFrom(loadFrom,universityAmount).Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("universities not found");
            }
        }
    }
}