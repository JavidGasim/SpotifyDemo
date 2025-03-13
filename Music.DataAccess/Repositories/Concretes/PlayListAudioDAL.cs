using Identity.DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using Music.DataAccess.Repositories.Abstracts;
using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.DataAccess.Repositories.Concretes
{
    public class PlayListAudioDAL : IPlayListAudioDAL
    {
        private readonly SpotifyDBContext _spotifyDbContext;
        public PlayListAudioDAL(SpotifyDBContext spotifyDbContext)
        {
            _spotifyDbContext = spotifyDbContext;
        }
        public async Task AddAsync(PlayListAudio playListAudio)
        {
            await _spotifyDbContext.PlayListAudios.AddAsync(playListAudio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(PlayListAudio playListAudio)
        {
            _spotifyDbContext.PlayListAudios.Remove(playListAudio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task<List<PlayListAudio>> GetAllAsync()
        {
            return await _spotifyDbContext.PlayListAudios.ToListAsync();
        }
        public async Task<List<PlayListAudio>> GetByPlayListIdAsync(int id)
        {
            return await _spotifyDbContext.PlayListAudios.Where(p => p.PlayListId == id).ToListAsync();
        }
        public async Task<PlayListAudio> GetByIdAsync(int id)
        {
            return await _spotifyDbContext.PlayListAudios.FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task UpdateAsync(PlayListAudio playListAudio)
        {
            _spotifyDbContext.PlayListAudios.Update(playListAudio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task<PlayListAudio> GetByPlayListAndAudioIdAsync(int playListId, int audioId)
        {
            return await _spotifyDbContext.PlayListAudios.FirstOrDefaultAsync(p => p.PlayListId == playListId && p.AudioId == audioId);
        }
    }
}
