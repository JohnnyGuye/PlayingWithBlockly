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
    using BlocklyTest.DAL;

    public class DecodersController : ApiController
    {
        private DecoderContext db = new DecoderContext();

        // GET: api/Decoders
        public IQueryable<Decoder> GetDecoders()
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
        }

        // POST: api/Decoders
        [ResponseType(typeof(Decoder))]
        public string PostDecoder(Decoder decoder)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    //return BadRequest(ModelState);
                    return "not valid model";
                }

                db.Decoders.Add(decoder);
                db.SaveChanges();

                //return CreatedAtRoute("DefaultApi", new { id = decoder.Id }, decoder);
                return "ok";
            }
            catch (Exception e )
            {

                return e.ToString();
            }
        }


        // DELETE: api/Decoders/5
        [ResponseType(typeof(Decoder))]
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
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DecoderExists(int id)
        {
            return db.Decoders.Count(e => e.Id == id) > 0;
        }
    }
}