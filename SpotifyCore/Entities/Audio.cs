using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyCore.Entities
{
    public class Audio
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? AudioUrl { get; set; }
        public bool IsFav { get; set; } = false;
        public bool IsLike { get; set; } = false;
        public int LikeCount { get; set; } = 0;
        public string? UserId { get; set; }
        public virtual CustomIdentityUser? User { get; set; }
        public IEnumerable<string>? Comments { get; set; }
        public Audio()
        {
            Comments = new List<string> { };
        }
    }
}
