using System.ComponentModel.DataAnnotations;

namespace Music.WebApi.Dtos
{
    public class AudioDTO
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        [Required]
        public string? AudioUrl { get; set; }
        [Required]
        public string? UserId { get; set; }
    }
}
