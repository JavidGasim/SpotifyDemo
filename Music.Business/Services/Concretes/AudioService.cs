using Music.Business.Services.Abstracts;
using Music.DataAccess.Repositories.Abstracts;
using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Business.Services.Concretes
{
    public class AudioService : IAudioService
    {
        private readonly IAudioDAL _audioDAL;
        public AudioService(IAudioDAL audioDAL)
        {
            _audioDAL = audioDAL;
        }
        public async Task AddAsync(Audio audio)
        {
            await _audioDAL.AddAsync(audio);
        }
        public async Task DeleteAsync(Audio audio)
        {
            await _audioDAL.DeleteAsync(audio);
        }
        public async Task<List<Audio>> GetAllAsync()
        {
            return await _audioDAL.GetAllAsync();
        }
        public async Task<Audio> GetByIdAsync(int id)
        {
            return await _audioDAL.GetByIdAsync(id);
        }
        public async Task<List<Audio>> GetUserAllAudiosAsync(string userId)
        {
            return await _audioDAL.GetUserAllAudiosAsync(userId);
        }
        public async Task UpdateAsync(Audio audio)
        {
            await _audioDAL.UpdateAsync(audio);
        }
        public async Task<List<Audio>> SearchByNameAsync(string name)
        {
            return await _audioDAL.SearchByNameAsync(name);
        }
    }
}
