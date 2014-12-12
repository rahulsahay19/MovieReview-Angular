using System.Data.Entity;
using MovieReview.Data.SampleData;
using MovieReview.Model;

namespace MovieReview.Data
{
    public class MovieReviewDbContext : DbContext
    {
        static MovieReviewDbContext()
        {
          //  Database.SetInitializer(new MovieReviewDatabaseInitializer());
        }
        public MovieReviewDbContext() : base(nameOrConnectionString: "MovieReview") { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesReview> MovieReviews { get; set; }


    }
}
