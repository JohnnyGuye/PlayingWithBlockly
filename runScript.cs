using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace BlocklyTest
{
    public class runScript
    {
        public static void Main()
        {
            ScriptManager.RegisterStartupScript(null,null, "Javascript", "javascript:FUNCTIONNAME(); ", true);
        }
    }
}