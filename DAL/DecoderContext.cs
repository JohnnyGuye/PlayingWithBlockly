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
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DecoderContext, Migrations.Configuration>("DecoderContext"));
        }
        public DbSet<Decoder> Decoders { get; set; }
        public DbSet<VariablesSet> AllVariables { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}