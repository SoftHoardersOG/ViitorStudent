﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace backend.Entities
{
    public partial class Reviews
    {
        public int review_id { get; set; }
        public string title { get; set; }
        public string body { get; set; }
        public int university_id { get; set; }
        public int rating { get; set; }
        public int user_id { get; set; }

        public virtual University university { get; set; }
        public virtual User user { get; set; }
    }
}