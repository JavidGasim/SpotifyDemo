using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Identity.DataAccess.Data
{
    public class SpotifyDBContext : IdentityDbContext<CustomIdentityUser, CustomIdentityRole, string>
    {
        public SpotifyDBContext(DbContextOptions<SpotifyDBContext> options) : base(options)
        {

        }

        public DbSet<Audio> Audios { get; set; }
        public DbSet<PlayList> Playlists { get; set; }
        public DbSet<PlayListAudio> PlayListAudios { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\ProjectModels; Initial Catalog = SpotifyDB; Integrated Security = True;", b => b.MigrationsAssembly("Identity.WebApi"));
        }
    }
}
