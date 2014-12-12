using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieReview.Data.Contracts;

namespace MovieReview.Web.Controllers
{
    public abstract class ApiBaseController : ApiController
    {
        protected IMovieReviewUow Uow { get; set; }
    }
}
