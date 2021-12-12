using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ExtendedUniversityModel : UniversityCard
    {
        public string LongDescription { get; set; }
        public string ExamInfo { get; set; }
        public ICollection<ReviewModel> Reviews { get; set; }
    }
}
