using AutoMapper;
using Identity.Business.Services.Abstracts;
using Identity.WebApi.Dtos;
using Identity.WebApi.Services.Abstracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpotifyCore.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Identity.WebApi.Controllers
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

        [HttpPost("newImage")]
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
