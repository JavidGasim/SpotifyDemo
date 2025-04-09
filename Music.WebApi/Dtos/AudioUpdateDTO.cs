using System.ComponentModel.DataAnnotations;

namespace Music.WebApi.Dtos
{
    public class AudioUpdateDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? AudioUrl { get; set; }
        public string? UserId { get; set; }
    }
}
