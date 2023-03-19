
using elyamit3ttl;
using System;
using System.Net;
using System.Web.Helpers;
using System.Web.Http;
using TrempsBLLProj;
using TrempsDalProj;

namespace elyamit3ttl.Controllers
{

    public class TrempsController : ApiController
    {
        public IHttpActionResult Get(char type = 'a')
        {            
            try
            {
                TrempType trempType = TrempType.ALL;

                if (type == 'r') trempType = TrempType.RIDE;
                else if (type == 't') trempType = TrempType.TREMP;

                Tremp[] tremps = TrempsBLL.GetAllTrempsFromDB(trempType);
                return Ok(tremps);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        public IHttpActionResult Get(int id)
        {
            try
            {
                Tremp tremp = TrempsBLL.GetTrempById(id);
                return Ok(tremp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        public IHttpActionResult Post([FromBody] Tremp tremp)
        {
            try
            {
                string msg = TrempsBLL.AddTrempToDB(tremp);
                return Ok(msg);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        public IHttpActionResult Delete(int id)
        {
            try
            {
                string msg = TrempsBLL.DeleteTrempFromDB(id);
                return Ok(msg);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.InternalServerError, e);
            }
        }


        public IHttpActionResult Put(int id, [FromBody] Tremp tremp)
        {
            try
            {
                string msg = TrempsBLL.UpdateTrempFromDB(id, tremp);
                return Ok(msg);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

    }
}

