using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Services
{
    using System.Diagnostics.Tracing;

    using BlocklyTest.DAL;
    using BlocklyTest.Models;

    public class DecoderServices
    {
        //private DecoderContext db = new DecoderContext();

        public Guid? AddDecoder(string xml, string code)
        {
            DecoderContext db=null;
            try
            {
                db = new DecoderContext();
                var decoder = new Decoder(xml, code);
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

        public string GetDecoder(Guid? id)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    return decoder.Xml;
                }
                else
                {
                    throw new KeyNotFoundException();
                }
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

        public Dictionary<string, List<BlockInfos>> GetCategoryInfos()
        {
            
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
               /* Dictionary<string, List<BlockInfos>> categoryInfos = db.Decoders
                    //.Select(d => new { d.Category, callInfos = new CallInfos(d.Id, d.Name, d.Parameters, d.Tags, d.Editable) })
                    .GroupBy(d => d.Category, d => new BlockInfos(d.Id, d.Name, d.Parameters, d.Tags, d.Editable))
                .ToDictionary(g => g.Key, g => g.ToList());*/
                var fromServer =
                    db.Decoders.Select(d => new { d.Category, d.Id, d.Name, d.Parameters, d.Tags, d.Editable }).ToList();
                var categoryInfos =
                    fromServer.GroupBy(d => d.Category, d => new BlockInfos(d.Id, d.Name, d.Parameters, d.Tags, d.Editable))
                        .ToDictionary(d => d.Key, d => d.ToList());
                return categoryInfos;
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

        public void DeleteDecoder(Guid id)
        {
            
        }
 
    }

    public class BlockInfos
    {
        public Guid? id;

        public string name;

        public string parameters;

        public string tags;

        public bool editable;

        public BlockInfos(Guid? id, string name, string parameters, string tags, bool editable)
        {
            this.id = id;
            this.name = name;
            this.parameters = parameters;
            this.tags = tags;
            this.editable = editable;
        }
    }
}