using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyCore.Entities
{
    public class CustomIdentityUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? ImagePath { get; set; }
        public virtual IEnumerable<Audio> Audios { get; set; }
        public CustomIdentityUser()
        {
            Audios = new List<Audio>();
        }
    }
}
