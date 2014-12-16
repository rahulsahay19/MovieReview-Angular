using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieReview.Data.Contracts;
using MovieReview.Model;

namespace MovieReview.Web.Controllers
{
    public class MoviesController : ApiBaseController
    {
        public MoviesController(IMovieReviewUow uow)
        {
            Uow = uow;
        }


        public IQueryable Get()
        {
            var model = Uow.Movies.GetAll().OrderByDescending(m => m.reviews.Count())
                .Select(m => new MovieViewModel
                {
                    Id = m.Id,
                    MovieName = m.MovieName,
                    DirectorName = m.DirectorName,
                    ReleaseYear = m.ReleaseYear,
                    NoOfReviews = m.reviews.Count()
                });
            return model; //Uow.Movies.GetAll().OrderBy(o => o.Id);

        }

        // GET /api/movie/5
        public Movie Get(int id)
        {
            var movie = Uow.Movies.GetById(id);
            if (movie != null) return movie;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        
        // /api/movies/getbydirectorname?value=john
        [ActionName("getbydirectorname")]
        public Movie GetByDirectorName(string value)
        {
            var movie = Uow.Movies.GetAll().FirstOrDefault(m => m.DirectorName.StartsWith(value));

            if (movie != null) return movie;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Update an existing movie
        // PUT /api/movies/
        public HttpResponseMessage Put([FromBody]Movie movie)
        {
            Uow.Movies.Update(movie);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // Create a new movie
        // POST /api/movies
        public HttpResponseMessage Post(Movie movie)
        {
            Uow.Movies.Add(movie);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, movie);

            

            return response;
        }

        //Delete a movie
        //Delete /api/movies/5
        public HttpResponseMessage Delete(int id)
        {
            Uow.Movies.Delete(id);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
