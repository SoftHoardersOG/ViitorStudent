using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.IServices;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public ActionResult Login(LoginModel loginModel)
        {
            if(_loginService.AuthenticateUser(loginModel)!=null)
                return Ok(new {token = _loginService.AuthenticateUser(loginModel) });
            return Unauthorized("wrong credentials");
        }

        [HttpGet]
        [Authorize]
        public ActionResult GetCurrentUser()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var username = identity.FindFirst("username")?.Value;
                if (username != " ")
                {
                    return Ok(_loginService.GetCurrentUser(username));
                }

                return NotFound("User not logged in!");
            }

            return NotFound("User not logged in!");
        }
    }
}
