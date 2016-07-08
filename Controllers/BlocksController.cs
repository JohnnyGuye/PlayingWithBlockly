namespace BlocklyTest
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Http;

    public class BlocksController : ApiController
    {
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
            File.WriteAllText(@"d:\Stage\stage\PlayingWithBlockly\GeneratedCode.txt", code);
            
            return code;
        }

        [Route("api/blocks/savexml")]
        [HttpPost]
        public string SaveXml([FromBody]string xml)
        {
            //throw new System.ArgumentException("Parameter cannot be null");
            File.WriteAllText(@"d:\Stage\stage\PlayingWithBlockly\BlocksInXml.txt", xml);
            return xml;
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