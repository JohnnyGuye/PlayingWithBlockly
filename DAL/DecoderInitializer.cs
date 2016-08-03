using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.DAL
{
    using System.Data.Entity;

    using BlocklyTest.Models; 

  /*  public class DecoderInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<DecoderContext>
    {
        
        protected override void Seed(DecoderContext context)
        {
            var decoders = new List<Decoder>
            {
            //new Decoder{Xml="Carson",Code="Decode bidule"},
            //new Decoder{Xml="some Xml",Code="Decode bidule2"},

            };
            decoders.ForEach(s => context.Decoders.Add(s));
            context.SaveChanges();

            var variables = new List<VariablesSet>
            {


            };
            variables.ForEach(s => context.AllVariables.Add(s));
            context.SaveChanges();

        }
    }*/
}