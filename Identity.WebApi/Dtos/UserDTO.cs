﻿namespace Identity.WebApi.Dtos
{
    public class UserDTO
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? ImagePath { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
    }
}
