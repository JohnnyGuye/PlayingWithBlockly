using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest
{
    using System.Diagnostics;
    using System.IO;

    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            try
            {
                //Console.WriteLine();
                //context.Response.ContentType = "text/plain";
                //context.Response.Write("Hello World");
                string strJson = new StreamReader(context.Request.InputStream).ReadToEnd();
                //string strJson = context.Request["code"];
                //File.WriteAllText(@"d:\Stage\stage\PlayingWithBlockly\GeneratedCode.txt", strJson);
                context.Response.Write(strJson);
            }
            catch (Exception e)
            {
                
                context.Response.Write(e.ToString()); ;
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}