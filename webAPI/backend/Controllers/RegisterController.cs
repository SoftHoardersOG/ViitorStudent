using Microsoft.AspNetCore.Mvc;
using System;
using backend.IServices;
using backend.Models;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }

        [HttpPost]
        public ActionResult RegisterUser(RegistrationModel registrationModel)
        {
            try
            {
                if (_registerService.Register(registrationModel).Result)
                {
                    return Ok(registrationModel);
                }
                else
                {
                    return Unauthorized("Username already exists.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound("An error occurred when trying to connect to database! ");
            }
        }

        [HttpGet]
        public ActionResult VerifyUsername(string username)
        {


            try
            {
                return Ok(_registerService.CanRegister(username).Result);
            }
            catch(Exception e)
            {
                Console.WriteLine(e); return NotFound("An error occurred when trying to connect to database! ");
            }
        }

    }
}