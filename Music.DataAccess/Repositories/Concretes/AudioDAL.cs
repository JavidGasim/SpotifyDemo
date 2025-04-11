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
    public class AudioDAL : IAudioDAL
    {
        private readonly SpotifyDBContext _spotifyDbContext;
        public AudioDAL(SpotifyDBContext spotifyDbContext)
        {
            _spotifyDbContext = spotifyDbContext;
        }
        public async Task AddAsync(Audio audio)
        {
            await _spotifyDbContext.Audios.AddAsync(audio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(Audio audio)
        {
            _spotifyDbContext.Audios.Remove(audio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task<List<Audio>> GetAllAsync()
        {
            return await _spotifyDbContext.Audios.ToListAsync();
        }
        public async Task<Audio> GetByIdAsync(int id)
        {
            return await _spotifyDbContext.Audios.FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<List<Audio>> GetUserAllAudiosAsync(string userId)
        {
            return await _spotifyDbContext.Audios.Where(a => a.UserId == userId).ToListAsync();
        }
        public async Task UpdateAsync(Audio audio)
        {
            _spotifyDbContext.Audios.Update(audio);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task<List<Audio>> SearchByNameAsync(string name)
        {
            return await _spotifyDbContext.Audios
                                 .Where(a => a.Name.Contains(name))
                                 .ToListAsync();
        }

    }
}
