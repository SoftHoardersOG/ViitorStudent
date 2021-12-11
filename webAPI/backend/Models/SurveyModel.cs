using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SurveyModel
    {
        public int UserId { get; set; }
        public ICollection<int> CityIds { get; set; }
        public ICollection<int> ClubIds { get; set; }
        public ICollection<int> InterestIds { get; set; }
        public ICollection<int> JobIds { get; set; }
        public ICollection<int> SubjectIds { get; set; }


    }
}
