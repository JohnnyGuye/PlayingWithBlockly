using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace BlocklyTest.DAL
{
    using System.Data.Entity;

    using BlocklyTest.Models;

    public class DecoderContext : DbContext
    {
        public DecoderContext()
            : base("DecoderContext")
        {
            
        }
        public DbSet<Decoder> Decoders { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}