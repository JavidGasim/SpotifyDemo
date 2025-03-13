using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Music.WebApi.Dtos;
using Music.WebApi.Services.Abstracts;
using Music.WebApi.Settings;
using System.Security.Principal;

namespace Music.WebApi.Services.Concretes
{
    public class CloudAudioService : ICloudAudioService
    {
        private readonly IConfiguration _configuration;
        private readonly Cloudinary _cloudinary;

        public CloudAudioService(IConfiguration configuration)
        {
            _configuration = configuration;
            var cloudinarySettings = _configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>();
            Account account = new Account(cloudinarySettings.CloudName, cloudinarySettings.ApiKey, cloudinarySettings.ApiSecret);

            _cloudinary = new Cloudinary(account);
        }
        public async Task<string> UploadAudioAsync(AudioCreationDTO dto)
        {
            var file = dto.File;
            var uploadedResult = new RawUploadResult();

            if (file?.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new RawUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        // ResourceType belirtmeden, raw formatta yüklüyoruz
                    };

                    uploadedResult = await _cloudinary.UploadAsync(uploadParams);

                    if (uploadedResult != null)
                    {
                        return uploadedResult.Url.ToString(); // Yüklenen dosyanın URL'sini döner
                    }
                }
            }

            return "";
        }
    }
}
