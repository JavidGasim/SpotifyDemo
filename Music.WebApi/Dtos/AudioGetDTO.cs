namespace Music.WebApi.Dtos
{
    public class AudioGetDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? AudioUrl { get; set; }
        public bool IsFav { get; set; }
        public bool IsLike { get; set; }
        public int LikeCount { get; set; }
        public string? UserId { get; set; }
        public IEnumerable<string>? Comments { get; set; }
    }
}
