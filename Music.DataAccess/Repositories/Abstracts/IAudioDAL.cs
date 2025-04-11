using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.DataAccess.Repositories.Abstracts
{
    public interface IAudioDAL
    {
        Task<List<Audio>> GetAllAsync();
        Task<Audio> GetByIdAsync(int id);
        Task<List<Audio>> GetUserAllAudiosAsync(string userId);
        Task AddAsync(Audio audio);
        Task UpdateAsync(Audio audio);
        Task DeleteAsync(Audio audio);
        Task<List<Audio>> SearchByNameAsync(string name);
    }
}
