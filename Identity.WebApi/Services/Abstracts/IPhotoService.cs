using Identity.WebApi.Dtos;

namespace Identity.WebApi.Services.Abstracts
{
    public interface IPhotoService
    {
        Task<string> UploadImageAsync(PhotoCreationDTO dto);
    }
}
