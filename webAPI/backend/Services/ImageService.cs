using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.IServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;
        public ImageService(IWebHostEnvironment env,IConfiguration config)
        {
            _env = env;
            _config = config;
        }
        public PhysicalFileResult FindImage(int universityId, ControllerBase controllerBase)
        {
            var path = $"{_env.ContentRootPath}/{_config["Images:Path"]}/{universityId}.jpg";
            return File.Exists(path) ? controllerBase.PhysicalFile(path, "image/jpeg") : null;
        }
    }
}
