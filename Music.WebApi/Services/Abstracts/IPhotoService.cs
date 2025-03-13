using Music.WebApi.Dtos;

namespace Music.WebApi.Services.Abstracts
{
    public interface IPhotoService
    {
        Task<string> UploadImageAsync(PhotoCreationDTO dto);
    }
}
