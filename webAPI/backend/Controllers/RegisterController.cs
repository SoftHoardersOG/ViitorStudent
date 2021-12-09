using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;


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
                if (_registerService.Register(registrationModel))
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

    }
}