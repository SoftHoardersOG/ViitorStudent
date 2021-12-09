using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.DbContext;
using backend.Entities;
using backend.IServices;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class LoginService :ILoginService
    {
        private readonly IConfiguration _config;
        private readonly DbCon _dbCon;

        public LoginService(IConfiguration config, DbCon dbCon)
        {
            _config = config;
            _dbCon = dbCon;
        }

        private async Task<string> GetRole(LoginModel loginModel)
        {
           var user = await _dbCon.Set<User>().FirstAsync(u => u.username == loginModel.username);
            return  user.role;
        }

        private async Task<bool> VerifyCredentials(LoginModel loginModel)
        {
            var user = await _dbCon.Set<User>().FirstOrDefaultAsync(u => u.username == loginModel.username);
            return (user != null) && (user.password == loginModel.passowrd);
        }

        private string GenerateJwt(LoginModel loginModel)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim("username", loginModel.username),
                new Claim("role",GetRole(loginModel).Result)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string AuthenticateUser(LoginModel loginModel)
        {
            return VerifyCredentials(loginModel).Result ? GenerateJwt(loginModel) : null;
        }
    }
}
