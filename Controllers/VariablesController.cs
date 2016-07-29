using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BlocklyTest.Controllers
{
    using System.IO;
    using System.Web.Hosting;

    using BlocklyTest.Models;

    public class VariablesController : ApiController
    {
        private static string hostPath = HostingEnvironment.ApplicationPhysicalPath;

        [Route("api/variables/save")]
        [HttpPost]
        public string Save([FromBody] string variables)
        {
            try
            {
                
                string path = hostPath + @"Controllers\variables_save.txt";
                /*if (variables == null)
                {
                    return "dic is null";
                }*/
                /*using (StreamWriter file = new StreamWriter(path))
                {
                    foreach (var entry in variables)
                    {
                        file.WriteAllTExt("[{0} {1}]", entry.Key, entry.Value);
                    }
                }*/
                File.WriteAllText(path, variables);
                return variables;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        [Route("api/variables/reload")]
        [HttpPost]
        public string Reload()
        {
            string path = hostPath + @"Controllers\variables_save.txt";
            string text = File.ReadAllText(path);
            return text;
        }


        [Route("api/variables/createset")]
        [HttpPost]
        public string CreateSet(VariablesSet set)
        {
            if (!ModelState.IsValid)
            {
                //return BadRequest(ModelState);
                return "not valid model";
            }
            return "work in progress";
        }

    }
}
