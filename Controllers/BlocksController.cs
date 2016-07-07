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
        [Route("api/blocks/save")]
        [HttpPost]   
        public string Save([FromBody]string value)
        {
            //throw new System.ArgumentException("Parameter cannot be null");
            File.WriteAllText(@"d:\Stage\stage\PlayingWithBlockly\GeneratedCode.txt", value);
            return value;
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