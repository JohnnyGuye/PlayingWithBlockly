namespace BlocklyTest
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Reflection;
    using System.Text;
    using System.Web.Hosting;
    using System.Web.Http;

    public class BlocksController : ApiController
    {

        private static string hostPath = HostingEnvironment.ApplicationPhysicalPath;

        private static string saveFolder = @"ServerStorage\";

        private static string codeFile = "GeneratedCode.txt";
        private static string xmlFile = "BlocksInXml.txt";

        string codePath = hostPath + saveFolder + codeFile;
        string xmlPath = hostPath + saveFolder + xmlFile;
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>

        //public void Save([FromBody]string value)
        [Route("api/blocks/savecode")]
        [HttpPost]   
        public string SaveCode([FromBody]string code)
        {
            //throw new System.ArgumentException("Parameter cannot be null");
            File.WriteAllText(@"D:\stage\Stage\PlayingWithBlockly\ServerStorage\GeneratedCode.txt", code, Encoding.Unicode);
            
            return code;
        }

        [Route("api/blocks/savexml")]
        [HttpPost]
        //public string SaveXml([FromBody]string xml)
        public string SaveXml([FromBody]SaveRequest request)
        {
            if (request != null)
            {
                try
                {
                    
                    File.WriteAllText(this.codePath, request.Code, Encoding.Unicode);
                    File.WriteAllText(this.xmlPath, request.Xml, Encoding.Unicode);
                    return "Sauvegarde réussie";
                }
                catch (Exception e)
                {
                    return ("Erreur interne au serveur lors de la sauvegarde\n" + e);
                }
            }
            else
            {
                return "Erreur lors de la sauvegarde,\nVeuillez réessayer";
            }
        }

        [Route("api/blocks/reload")]
        [HttpPost]
        public string Reload()
        {
            string xmlText = File.ReadAllText(this.xmlPath);
            return xmlText;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}

public class SaveRequest
{
    public string Code { get; set; }
    public string Xml { get; set; }

}