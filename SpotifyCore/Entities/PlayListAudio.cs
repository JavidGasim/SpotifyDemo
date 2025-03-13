using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyCore.Entities
{
    public class PlayListAudio
    {
        public int Id { get; set; }
        public int AudioId { get; set; }
        public int PlayListId { get; set; }
    }
}
