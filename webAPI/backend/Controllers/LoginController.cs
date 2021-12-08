using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.IServices;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public ActionResult Login(LoginModel loginModel)
        {
            if(_loginService.AuthenticateUser(loginModel)!=null)
                return Ok(_loginService.AuthenticateUser(loginModel));
            return Unauthorized("wrong credentials");
        }
    }
}
