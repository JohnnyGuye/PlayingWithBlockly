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

        public void AddDecoder(Decoder decoder)
        {
            DecoderContext db=null;
            try
            {
                db = new DecoderContext();
                decoder.SetCategoryAndTags();
                db.Decoders.Add(decoder);
                db.SaveChanges();

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

        public void UpdateDecoder(Guid? id, string xml, string code)
        {
            DecoderContext db = null;
            try
            {
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    decoder.Xml = xml;
                    decoder.Code = code;
                    decoder.SetCategoryAndTags();
                    db.SaveChanges();
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
    }
}