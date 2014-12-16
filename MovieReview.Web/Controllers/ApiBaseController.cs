using System.Web.Http;
using MovieReview.Data.Contracts;

namespace MovieReview.Web.Controllers
{
    public abstract class ApiBaseController : ApiController
    {
        protected IMovieReviewUow Uow { get; set; }
    }
}
