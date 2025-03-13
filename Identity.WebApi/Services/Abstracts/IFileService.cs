namespace Identity.WebApi.Services.Abstracts
{
    public interface IFileService
    {
        Task<string> GetDataAsync(string path);
        Task SetDataAsync(string path, string value);
    }
}
