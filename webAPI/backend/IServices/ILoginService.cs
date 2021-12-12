using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.IServices
{
    public interface ILoginService
    {
        string AuthenticateUser(LoginModel loginModel);
        UserModel GetCurrentUser(string username);
        Task<User> GetUser(string username);
    }
}
