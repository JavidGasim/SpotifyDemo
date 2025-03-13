using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Business.Services.Abstracts
{
    public interface IPlayListAudioService
    {
        Task<List<PlayListAudio>> GetAllAsync();
        Task<PlayListAudio> GetByIdAsync(int id);
        Task<PlayListAudio> GetByPlayListAndAudioIdAsync(int playListId, int audioId);
        Task<List<PlayListAudio>> GetByPlayListIdAsync(int id);
        Task AddAsync(PlayListAudio playListAudio);
        Task UpdateAsync(PlayListAudio playListAudio);
        Task DeleteAsync(PlayListAudio playListAudio);
    }
}
