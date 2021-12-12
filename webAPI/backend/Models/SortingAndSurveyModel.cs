using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SortingAndSurveyModel
    {
        public SurveyModel surveyModel { get; set; }
        public SortFilterModel sortFilterModel { get; set; }
        public int startingPoint { get; set; }
        public int maxNumber { get; set; }
    }
}
