using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BlocklyTest.Models;

namespace BlocklyTest.Controllers
{
    using System.Web.Script.Serialization;

    using BlocklyTest.DAL;
    using BlocklyTest.Services;

    public class DecodersController : ApiController
    {
        // DecoderContext db = new DecoderContext();

        // GET: api/Decoders
        /* public IQueryable<Decoder> GetDecoders()
         {
             return db.Decoders;
         }

         // GET: api/Decoders/5
         [ResponseType(typeof(Decoder))]
         public IHttpActionResult GetDecoder(int id)
         {
             Decoder decoder = db.Decoders.Find(id);
             if (decoder == null)
             {
                 return NotFound();
             }

             return Ok(decoder);
         }

         // PUT: api/Decoders/5
         [ResponseType(typeof(void))]
         public IHttpActionResult PutDecoder(int id, Decoder decoder)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             if (id != decoder.Id)
             {
                 return BadRequest();
             }

             db.Entry(decoder).State = EntityState.Modified;

             try
             {
                 db.SaveChanges();
             }
             catch (DbUpdateConcurrencyException)
             {
                 if (!DecoderExists(id))
                 {
                     return NotFound();
                 }
                 else
                 {
                     throw;
                 }
             }

             return StatusCode(HttpStatusCode.NoContent);
         }*/

        // POST: api/Decoders
        //[ResponseType(typeof(Decoder))]
        [Route("api/Decoders")]
        [HttpPost]
        public IHttpActionResult PostDecoder(Decoder decoder)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    //return BadRequest(ModelState);
                    return Json(new { error= "modèle non valide" });
                }
                if (decoder == null)
                {
                    return Json(new { error = "erreur lors du transfert de données vers le serveur" });
                }

                var services = new DecoderServices();
                if (decoder.Id == null)
                {
                    var decoderId = services.AddDecoder(decoder.Xml, decoder.Code);
                    return Json(new { id= decoderId.ToString() });
                }
                else
                {
                   services.UpdateDecoder(decoder.Id, decoder.Xml, decoder.Code);
                    return Json(new { id = decoder.Id.ToString() });
                }

                
            }
            catch (Exception e )
            {
                return Json(new { error = e.ToString() });
            }
        }


        [Route("api/Decoders/decoderdef")]
        [HttpPost]
        public IHttpActionResult GetDecoderDef(IdRequest r)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    //return BadRequest(ModelState);
                    return Json(new { error = "modèle non valide" });
                }
                var id = new Guid(r.Id);
                var services = new DecoderServices();
                var decoderXml = services.GetDecoderDef(id);
                if (decoderXml != null)
                {
                    return Json(new { xml = decoderXml });
                }
                return Json(new { error = "Décodeur non éditable" });

            }
            catch (Exception e)
            {
                return Json(new { error = e.ToString() });
            }
        }


        [Route("api/Decoders/categories")]
        [HttpPost]
        public IHttpActionResult GetCategories()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    //return BadRequest(ModelState);
                    //return Json(new { error = "bad model state" });
                    return Json(new { error = "modèle non valide" });
                }
                var services = new DecoderServices();
                var map =services.GetCategoryInfos();
                return Json(new JavaScriptSerializer().Serialize(map));

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return Json(new { error = e.ToString() });
            }
        }

        [Route("api/Decoders/findusages")]
        [HttpPost]
        public IHttpActionResult FindUsages(IdRequest r)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    //return BadRequest(ModelState);
                    //return Json(new { error = "bad model state" });
                    return Json(new { error = "modèle non valide" });
                }
                var services = new DecoderServices();
                var list = services.FindProcedureUsages(new Guid(r.Id));
                return Json(list.ToArray());

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return Json(new { error = e.ToString() });
            }
        }


        // DELETE: api/Decoders/5
        /*  [ResponseType(typeof(Decoder))]
          public IHttpActionResult DeleteDecoder(int id)
          {
              Decoder decoder = db.Decoders.Find(id);
              if (decoder == null)
              {
                  return NotFound();
              }

              db.Decoders.Remove(decoder);
              db.SaveChanges();

              return Ok(decoder);
          }*/

        /*protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }*/

        /*private bool DecoderExists(int id)
        {
            return db.Decoders.Count(e => e.Id == id) > 0;
        }*/
    }
}

public class IdRequest
{
    public string Id;
}