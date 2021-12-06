using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DbContext;
using backend.Entities;
using backend.Mappers;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DbCon _dbCon;
        private readonly IMapper _mapper;

        public LoginController(DbCon dbCon,IMapper mapper)
        {
            _dbCon = dbCon;
            _mapper = mapper;
        }

        [HttpPost]
        public ActionResult RegisterUser(UserModel userModel)
        {
            try
            {
                _dbCon.Add(_mapper.Map<User>(userModel));
                _dbCon.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotFound();
            }
        }

    }
}
