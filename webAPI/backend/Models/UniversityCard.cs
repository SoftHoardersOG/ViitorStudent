using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UniversityCard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Group { get; set; }
        public string ShortDescription { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
    }
}
