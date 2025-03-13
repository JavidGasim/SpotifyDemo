using AutoMapper;
using Identity.Business.Services.Abstracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Music.Business.Services.Abstracts;
using Music.WebApi.Dtos;
using Music.WebApi.Services.Abstracts;
using SpotifyCore.Entities;

namespace Music.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IAudioService _audioService;
        private readonly ICloudAudioService _cloudAudioService;
        private readonly IMapper _mapper;
        private readonly ICustomIdentityUserService _customIdentityUserService;
        private readonly IPlayListService _playListService;
        private readonly IPlayListAudioService _playListAudioService;
        private readonly IFileService _fileService;

        //private readonly string _filePath = "/app/log.txt";
        private readonly string _filePath = "log.txt";
        public MusicController(IAudioService audioService, ICloudAudioService cloudAudioService, IMapper mapper, ICustomIdentityUserService customIdentityUserService, IPlayListService playListService, IPlayListAudioService playListAudioService, IFileService fileService)
        {
            _audioService = audioService;
            _cloudAudioService = cloudAudioService;
            _mapper = mapper;
            _customIdentityUserService = customIdentityUserService;
            _playListService = playListService;
            _playListAudioService = playListAudioService;
            _fileService = fileService;
        }
        [HttpPost("uploadAudio")]
        public async Task<IActionResult> UploadAudio()
        {

            var file = Request.Form.Files.GetFile("file");

            if (file != null && file.Length > 0)
            {
                string result = await _cloudAudioService.UploadAudioAsync(new AudioCreationDTO { File = file });
                await _fileService.SetDataAsync(_filePath, "Audio Creation Succesfully For Music!");

                return Ok(new { AudioUrl = result });
            }

            await _fileService.SetDataAsync(_filePath, "Audio Creation Failed For Music!");

            return BadRequest(new { Message = "Audio Upload Failed!" });
        }

        [Authorize]
        [HttpPost("newAudio")]
        public async Task<IActionResult> AddAudio([FromBody] AudioDTO dto)
        {
            var audio = _mapper.Map<Audio>(dto);
            var user = await _customIdentityUserService.GetByIdAsync(dto.UserId);
            audio.User = user;
            await _audioService.AddAsync(audio);

            await _fileService.SetDataAsync(_filePath, "Audio uploaded successfully!");

            return Ok(new { Message = "Audio uploaded successfully!" });
        }

        [Authorize]
        [HttpGet("userAllAudios/{userId}")]
        public async Task<IActionResult> GetUserAllAudios(string userId)
        {
            var audios = await _audioService.GetUserAllAudiosAsync(userId);
            var audiosDto = _mapper.Map<List<AudioGetDTO>>(audios);

            await _fileService.SetDataAsync(_filePath, "User All Audios Returned Successfully!");

            return Ok(new { Audios = audios });
        }

        [HttpGet("allAudios")]
        public async Task<IActionResult> GetAllAudios()
        {
            var audios = await _audioService.GetAllAsync();
            var audiosDto = _mapper.Map<List<AudioGetDTO>>(audios);

            await _fileService.SetDataAsync(_filePath, "All Audios Returned Successfully!");

            return Ok(audios);
        }

        [HttpGet("audio/{id}")]
        public async Task<IActionResult> GetAllAudios(int id)
        {
            var audio = await _audioService.GetByIdAsync(id);

            if (audio == null)
            {
                await _fileService.SetDataAsync(_filePath, "Audio Not Found!");
                return NotFound();
            }

            await _fileService.SetDataAsync(_filePath, "Audio Found!");

            return Ok(audio);
        }

        [HttpPut("likeCount/{audioId}")]
        public async Task<IActionResult> PutAudioLikeCount(int audioId)
        {
            var audio = await _audioService.GetByIdAsync(audioId);

            if (audio == null)
            {
                await _fileService.SetDataAsync(_filePath, "Not Found Audio With This Id For LikeCount Method");
                return BadRequest(new { Message = "Not Found Audio With This Id" });
            }

            audio.LikeCount += 1;
            await _audioService.UpdateAsync(audio);

            await _fileService.SetDataAsync(_filePath, "Audio Like Count Changed Succesfully");

            return Ok(new { Message = "Audio Like Count Changed Succesfully" });
        }

        [HttpPost("playList")]
        public async Task<IActionResult> CreatePlayList(string name, int audioId)
        {
            var playList = await _playListService.GetByNameAsync(name);

            if (playList == null)
            {
                var newPlayList = new PlayList
                {
                    Name = name
                };

                await _playListService.AddAsync(newPlayList);
                playList = newPlayList;
            }

            var playListAudioForCheck = await _playListAudioService.GetByPlayListAndAudioIdAsync(playList.Id, audioId);

            if (playListAudioForCheck == null)
            {
                var playListAudo = new PlayListAudio
                {
                    PlayListId = playList.Id,
                    AudioId = audioId
                };

                await _playListAudioService.AddAsync(playListAudo);
            }

            await _fileService.SetDataAsync(_filePath, "PlayList Added Successfully");

            return Ok(new { Message = "PlayList Added Successfully" });
        }

        [HttpGet("allPlayLists")]
        public async Task<IActionResult> GetAllPlayLists()
        {
            var playLists = await _playListService.GetAllAsync();
            var playListDtos = _mapper.Map<List<PlayListDTO>>(playLists);

            await _fileService.SetDataAsync(_filePath, "All PlayList Returned Successfully");

            return Ok(new { PlayLists = playListDtos });
        }

        [HttpGet("playListAudios")]
        public async Task<IActionResult> GetPlayListAudios(string name)
        {
            var playList = await _playListService.GetByNameAsync(name);
            var playListAudios = await _playListAudioService.GetByPlayListIdAsync(playList.Id);

            var audios = new List<AudioGetDTO> { };

            foreach (var playListAudio in playListAudios)
            {
                var audio = await _audioService.GetByIdAsync(playListAudio.AudioId);
                var audioDto = _mapper.Map<AudioGetDTO>(audio);
                audios.Add(audioDto);
            }

            await _fileService.SetDataAsync(_filePath, "PlayList Audios Returned Successfully");

            return Ok(new { Audios = audios });
        }

        [HttpGet("playListId")]
        public async Task<IActionResult> GetPlayListId([FromQuery] string name)
        {
            var playList = await _playListService.GetByNameAsync(name);
            if (playList == null)
            {
                await _fileService.SetDataAsync(_filePath, "Not Found PlayList With This Name");

                return BadRequest(new { Message = "Not Found PlayList With This Name" });
            }

            await _fileService.SetDataAsync(_filePath, "PlayList Id Returned Successfully");

            return Ok(new { Id = playList.Id, Message = "PlayList Id Returned Successfully" });
        }

        [HttpPost("newFavAudio")]
        public async Task<IActionResult> AddFavAudio([FromQuery] string userId, [FromQuery] int audioId)
        {
            var audio = await _audioService.GetByIdAsync(audioId);
            if (string.IsNullOrEmpty(userId) || audio == null)
            {
                await _fileService.SetDataAsync(_filePath, "User ID and audio cannot be null");

                return BadRequest(new { Message = "User ID and audio cannot be null" });
            }

            audio.IsFav = true;
            await _audioService.UpdateAsync(audio);

            await _fileService.SetDataAsync(_filePath, "Audio added to favourites");

            return Ok(new { Message = "Audio added to favourites" });
        }

        [HttpPost("removeFavAudio")]
        public async Task<IActionResult> RemoveFavAudio([FromQuery] string userId, [FromQuery] int audioId)
        {
            var audio = await _audioService.GetByIdAsync(audioId);

            if (string.IsNullOrEmpty(userId) || audio == null)
            {
                await _fileService.SetDataAsync(_filePath, "User ID and audio cannot be null");

                return BadRequest(new { Message = "User ID and audio cannot be null" });
            }

            audio.IsFav = false;
            await _audioService.UpdateAsync(audio);

            await _fileService.SetDataAsync(_filePath, "Audio deleted to favourites");

            return Ok(new { Message = "Audio deleted to favourites" });
        }

        [HttpGet("allFavAudios")]
        public async Task<IActionResult> GetAllFavAudios([FromQuery] string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                await _fileService.SetDataAsync(_filePath, "User ID cannot be null");

                return BadRequest(new { Message = "User ID cannot be null" });
            }

            //var favourites = await _redisService.GetFavouriteAudiosAsync(userId);
            var favourites = await _audioService.GetAllAsync();
            List<Audio> favs = new List<Audio>();
            foreach (var fav in favourites)
            {
                if (fav.IsFav == true && fav.User.Id == userId)
                {
                    favs.Add(fav);
                }
            }
            var favouritesDto = _mapper.Map<List<AudioGetDTO>>(favs);

            await _fileService.SetDataAsync(_filePath, "All Fav Audios Returned Succesfully");

            return Ok(new { Favourites = favouritesDto });
        }

        [HttpPost("newComment")]
        public async Task<IActionResult> AddComment([FromQuery] int audioId, [FromQuery] string comment)
        {
            string id = audioId.ToString();
            //await _rabbitMQService.PublishMessageAsync(id, comment);


            var audio = await _audioService.GetByIdAsync(audioId);
            //var comments = await _rabbitMQService.GetMessagesAsync(id);
            List<string> comments = new List<string>();

            if (audio.Comments.Count() > 0)
            {
                foreach (var com in audio.Comments)
                {
                    comments.Add(com);
                }
            }

            audio.Comments = comments;
            await _audioService.UpdateAsync(audio);

            await _fileService.SetDataAsync(_filePath, "Message published successfully.");

            return Ok(new { Message = "Message published successfully." });
        }

        [HttpGet("allComments/{audioId}")]
        public async Task<IActionResult> GetAllComments(int audioId)
        {
            string id = audioId.ToString();
            var audio = await _audioService.GetByIdAsync(audioId);
            //var comments = await _rabbitMQService.GetMessagesAsync(id);
            List<string> comments = new List<string>();

            if (audio.Comments.Count() > 0)
            {
                foreach (var com in audio.Comments)
                {
                    comments.Add(com);
                }
            }

            await _fileService.SetDataAsync(_filePath, "All Comments Returned Succesfully");

            return Ok(new { Comments = comments });
        }

    }
}
