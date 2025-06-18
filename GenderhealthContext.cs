using Microsoft.EntityFrameworkCore;
using GenderHealthSystem.Models;

namespace GenderHealthSystem.Data
{
    public class GenderhealthContext : DbContext
    {
        public GenderhealthContext(DbContextOptions<GenderhealthContext> options)
            : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Optional: Config table name if different from class name
            modelBuilder.Entity<Question>().ToTable("Questions");

            // Optional: Configure constraints, keys, etc.
            base.OnModelCreating(modelBuilder);
        }
    }
}
