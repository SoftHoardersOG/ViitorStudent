using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SortFilterModel
    {
        public string SortingType { get; set; }
        public List<int> Cities { get; set; }
        public List<int> Subjects { get; set; }
    }
}
