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
    public class PlayListDAL : IPlayListDAL
    {
        private readonly SpotifyDBContext _spotifyDbContext;
        public PlayListDAL(SpotifyDBContext spotifyDbContext)
        {
            _spotifyDbContext = spotifyDbContext;
        }
        public async Task AddAsync(PlayList playList)
        {
            await _spotifyDbContext.Playlists.AddAsync(playList);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(PlayList playList)
        {
            _spotifyDbContext.Playlists.Remove(playList);
            await _spotifyDbContext.SaveChangesAsync();
        }
        public async Task<List<PlayList>> GetAllAsync()
        {
            return await _spotifyDbContext.Playlists.ToListAsync();
        }
        public async Task<PlayList> GetByIdAsync(int id)
        {
            return await _spotifyDbContext.Playlists.FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<PlayList> GetByNameAsync(string name)
        {
            return await _spotifyDbContext.Playlists.FirstOrDefaultAsync(p => p.Name == name);
        }
        public async Task UpdateAsync(PlayList playList)
        {
            _spotifyDbContext.Playlists.Update(playList);
            await _spotifyDbContext.SaveChangesAsync();
        }
    }
}
