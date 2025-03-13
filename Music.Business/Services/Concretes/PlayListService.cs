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
    public class PlayListService : IPlayListService
    {
        private readonly IPlayListDAL _playListDAL;
        public PlayListService(IPlayListDAL playListDAL)
        {
            _playListDAL = playListDAL;
        }
        public async Task AddAsync(PlayList playList)
        {
            await _playListDAL.AddAsync(playList);
        }
        public async Task DeleteAsync(PlayList playList)
        {
            await _playListDAL.DeleteAsync(playList);
        }
        public async Task<List<PlayList>> GetAllAsync()
        {
            return await _playListDAL.GetAllAsync();
        }
        public async Task<PlayList> GetByIdAsync(int id)
        {
            return await _playListDAL.GetByIdAsync(id);
        }
        public async Task<PlayList> GetByNameAsync(string name)
        {
            return await _playListDAL.GetByNameAsync(name);
        }
        public async Task UpdateAsync(PlayList playList)
        {
            await _playListDAL.UpdateAsync(playList);
        }
    }
}
