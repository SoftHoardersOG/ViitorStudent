using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ReviewModel
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public int Rating { get; set; }
        public int UserId { get; set; }
        public int UniversityId { get; set; }
    }
}
