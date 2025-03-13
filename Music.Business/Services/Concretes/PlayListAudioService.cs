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
    public class PlayListAudioService : IPlayListAudioService
    {
        private readonly IPlayListAudioDAL _playListAudioDAL;
        public PlayListAudioService(IPlayListAudioDAL playListAudioDAL)
        {
            _playListAudioDAL = playListAudioDAL;
        }
        public async Task AddAsync(PlayListAudio playListAudio)
        {
            await _playListAudioDAL.AddAsync(playListAudio);
        }
        public async Task DeleteAsync(PlayListAudio playListAudio)
        {
            await _playListAudioDAL.DeleteAsync(playListAudio);
        }
        public async Task<List<PlayListAudio>> GetAllAsync()
        {
            return await _playListAudioDAL.GetAllAsync();
        }
        public Task<List<PlayListAudio>> GetByPlayListIdAsync(int id)
        {
            return _playListAudioDAL.GetByPlayListIdAsync(id);
        }
        public async Task<PlayListAudio> GetByIdAsync(int id)
        {
            return await _playListAudioDAL.GetByIdAsync(id);
        }
        public async Task UpdateAsync(PlayListAudio playListAudio)
        {
            await _playListAudioDAL.UpdateAsync(playListAudio);
        }
        public async Task<PlayListAudio> GetByPlayListAndAudioIdAsync(int playListId, int audioId)
        {
            return await _playListAudioDAL.GetByPlayListAndAudioIdAsync(playListId, audioId);
        }
    }
}
