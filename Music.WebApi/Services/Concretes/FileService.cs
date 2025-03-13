using Music.WebApi.Services.Abstracts;

namespace Music.WebApi.Services.Concretes
{
    public class FileService : IFileService
    {
        public Task<string> GetDataAsync(string path)
        {
            return Task.Run(() =>
            {
                var data = File.ReadAllText(path);
                return data;
            });
        }
        public Task SetDataAsync(string path, string value)
        {
            return Task.Run(() =>
            {
                File.WriteAllText(path, value);
            });
        }
    }
}
