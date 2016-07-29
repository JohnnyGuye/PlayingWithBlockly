using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.IO;
    using System.Xml;

    public class Decoder
    {
        public Decoder() { }

        public Decoder(string xml, string code)
        {
            this.Xml = xml;
            this.Code = code;
            this.Editable = true;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid? Id { get; set; }

        public string Xml { get; set; }

        public string Code { get; set; }

        public bool Editable { get; set; }

        public string Category { get; set; }

        public string Tags { get; set; }

        public void SetCategoryAndTags()
        {
            using (XmlReader reader = XmlReader.Create(new StringReader(this.Xml)))
            {
                reader.ReadToFollowing("field");
                reader.ReadToFollowing("field");
                reader.ReadToFollowing("field");
                this.Category = reader.ReadElementContentAsString();
                reader.ReadToFollowing("field");
                this.Tags= reader.ReadElementContentAsString();
            }
        }
    }
}