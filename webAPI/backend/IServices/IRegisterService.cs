﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.IServices
{
    public interface IRegisterService
    {
        bool Register(UserModel userModel);
    }
}