using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Music.WebApi.Dtos;
using Music.WebApi.Services.Abstracts;

namespace Music.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IFileService _fileService;

        public ImageController(IPhotoService photoService, IFileService fileService)
        {
            _photoService = photoService;
            _fileService = fileService;
        }

        [HttpPost("musicNewImage")]
        public async Task<IActionResult> Post()
        {
            var file = Request.Form.Files.GetFile("file");

            if (file != null && file.Length > 0)
            {
                string result = await _photoService.UploadImageAsync(new PhotoCreationDTO { File = file });

                return Ok(new { ImageUrl = result });

            }

            return BadRequest(new { Message = "Photo Creation Failed!" });
        }
    }
}
