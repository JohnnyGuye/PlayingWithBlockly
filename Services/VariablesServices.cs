using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlocklyTest.Services
{
    using BlocklyTest.DAL;
    using BlocklyTest.Models;

    public class VariablesServices
    {
        public int AddVariablesSet(VariablesSet set)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                db.AllVariables.Add(set);
                db.SaveChanges();
                return set.Id;
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

        public int UpdateVariablesSet(int id, string name, string variables)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var set = db.AllVariables.Find(id);
                if (set != null)
                {
                    set.Name = name;
                    set.Variables = variables;
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

        public VariablesSet[] GetTypedSets(Types type)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var query = from set in db.AllVariables
                               where set.Type == type
                               select set;
                return query.ToArray();
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
    }
}