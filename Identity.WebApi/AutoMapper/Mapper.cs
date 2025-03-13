using AutoMapper;
using Identity.WebApi.Dtos;
using SpotifyCore.Entities;

namespace Identity.WebApi.AutoMapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CustomIdentityUser, UserDTO>().ReverseMap();
        }
    }
}
