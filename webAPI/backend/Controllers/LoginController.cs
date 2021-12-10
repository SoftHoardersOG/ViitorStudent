using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost,Authorize]
        public ActionResult Login(LoginModel loginModel)
        {
            // var result = _loginService.AuthenticateUser(loginModel);
            // if(result)
            if (_loginService.AuthenticateUser(loginModel)!=null)
                return Ok( new {token = _loginService.AuthenticateUser(loginModel) });
            return Unauthorized("wrong credentials");
        }
    }
}
