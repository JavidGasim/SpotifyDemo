using System.ComponentModel.DataAnnotations;

namespace Identity.WebApi.Dtos
{
    public class LoginDTO
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
