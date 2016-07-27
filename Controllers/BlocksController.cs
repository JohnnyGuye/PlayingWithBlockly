namespace BlocklyTest
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text;
    using System.Web.Hosting;
    using System.Web.Http;

    public class BlocksController : ApiController
    {
        private static readonly string codeFile = "GeneratedCode.txt";

        private static readonly string hostPath = HostingEnvironment.ApplicationPhysicalPath;

        private static readonly string saveFolder = @"ServerStorage\";

        private static readonly string xmlFile = "BlocksInXml.txt";

        private readonly string codePath = hostPath + saveFolder + codeFile;

        private readonly string xmlPath = hostPath + saveFolder + xmlFile;

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        [Route("api/blocks/reload")]
        [HttpPost]
        public string Reload()
        {
            var xmlText = File.ReadAllText(this.xmlPath);
            return xmlText;
        }

        // POST api/<controller>

        // public void Save([FromBody]string value)
        [Route("api/blocks/savecode")]
        [HttpPost]
        public string SaveCode([FromBody] string code)
        {
            // throw new System.ArgumentException("Parameter cannot be null");
            File.WriteAllText(
                @"D:\stage\Stage\PlayingWithBlockly\ServerStorage\GeneratedCode.txt", 
                code, 
                Encoding.Unicode);

            return code;
        }

        [Route("api/blocks/savexml")]
        [HttpPost]

        // public string SaveXml([FromBody]string xml)
        public string SaveXml([FromBody] SaveRequest request)
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
                    return "Erreur interne au serveur lors de la sauvegarde\n" + e;
                }
            }

            return "Erreur lors de la sauvegarde,\nVeuillez réessayer";
        }
    }
}

public class SaveRequest
{
    public string Code { get; set; }

    public string Xml { get; set; }
}