using AutoMapper;
using Music.WebApi.Dtos;
using SpotifyCore.Entities;

namespace Music.WebApi.AutoMapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Audio, AudioDTO>().ReverseMap();
            CreateMap<Audio, AudioGetDTO>().ReverseMap();
            CreateMap<PlayList, PlayListDTO>().ReverseMap();
        }
    }
}
