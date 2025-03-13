using Music.WebApi.Dtos;

namespace Music.WebApi.Services.Abstracts
{
    public interface ICloudAudioService
    {
        Task<string> UploadAudioAsync(AudioCreationDTO dto);
    }
}
