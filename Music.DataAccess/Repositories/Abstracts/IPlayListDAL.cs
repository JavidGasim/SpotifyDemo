﻿using SpotifyCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.DataAccess.Repositories.Abstracts
{
    public interface IPlayListDAL
    {
        Task<List<PlayList>> GetAllAsync();
        Task<PlayList> GetByIdAsync(int id);
        Task<PlayList> GetByNameAsync(string name);
        Task AddAsync(PlayList playList);
        Task UpdateAsync(PlayList playList);
        Task DeleteAsync(PlayList playList);
    }
}
