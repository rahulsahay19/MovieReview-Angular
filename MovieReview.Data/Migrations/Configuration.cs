namespace MovieReview.Data.Migrations
{
    using System.Data.Entity.Migrations;


    internal sealed class Configuration : DbMigrationsConfiguration<MovieReviewDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

       
    }
}
