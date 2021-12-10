using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.IServices
{
    public interface ILoginService
    {
        string AuthenticateUser(LoginModel loginModel);
        UserModel GetCurrentUser(string username);
    }
}
