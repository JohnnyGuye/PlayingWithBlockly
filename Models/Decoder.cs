using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Models
{
    using System.ComponentModel.DataAnnotations.Schema;


    public class Decoder
    {
        public int Id { get; set; }

        public string Xml { get; set; }

        public string Code { get; set; }

        public bool Editable { get; set; }

        public string Category { get; set; }

        public string[] Tags { get; set; }
    }
}