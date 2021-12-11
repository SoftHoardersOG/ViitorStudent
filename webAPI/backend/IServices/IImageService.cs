using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.IServices
{
    public interface IImageService
    {
        PhysicalFileResult FindImage(int universityId, ControllerBase controllerBase);

    }
}
