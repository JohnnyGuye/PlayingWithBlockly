using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Services
{
    using BlocklyTest.DAL;
    using BlocklyTest.Models;

    public class DecoderServices
    {
        //private DecoderContext db = new DecoderContext();

        public Guid? AddDecoder(Decoder decoder)
        {
            DecoderContext db=null;
            try
            {
                db = new DecoderContext();
                decoder.UpdateFieldsFromXml();
                db.Decoders.Add(decoder);
                db.SaveChanges();
                return decoder.Id;
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw ;
                }               
            }
        }

        public Guid? UpdateDecoder(Guid? id, string xml, string code)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    decoder.Xml = xml;
                    decoder.Code = code;
                    decoder.UpdateFieldsFromXml();
                    db.SaveChanges();
                    return id;
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }          
        }

        public Decoder GetDecoder(Guid? id)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                return decoder;
            }
            catch(Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        struct CallInfos
        {
            public string name;

            public string parameters;

            public string tags;
        }
    }
}