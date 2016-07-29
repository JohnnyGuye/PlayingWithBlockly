using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public enum Types
    {
        Config,
        Inventory,
        Simple
    }
    public class VariablesSet
    {

        public int Id;

        public string Name;

        public Types Type;

        public string Variables;
    }
}