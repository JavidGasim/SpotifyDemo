using Identity.Business.Services.Abstracts;
using Identity.Business.Services.Concretes;
using Identity.DataAccess.Data;
using Identity.DataAccess.Repositories.Abstracts;
using Identity.DataAccess.Repositories.Concretes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Music.Business.Services.Abstracts;
using Music.Business.Services.Concretes;
using Music.DataAccess.Repositories.Abstracts;
using Music.DataAccess.Repositories.Concretes;
using Music.WebApi.Services.Abstracts;
using Music.WebApi.Services.Concretes;
using System.Text;

namespace Music.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddControllers()
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials());
            });

            builder.Services.AddAutoMapper(typeof(Program).Assembly);

            builder.Services.AddScoped<IPhotoService, PhotoService>();
            builder.Services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                };
            });

            //builder.Services.AddAuthorization();

            builder.Services.AddAuthorization(Options =>
            {
                Options.AddPolicy("ClientPolicy", policy => policy.RequireRole("Client"));
            });

            builder.Services.AddAutoMapper(typeof(Program).Assembly);

            builder.Services.AddScoped<IAudioDAL, AudioDAL>();
            builder.Services.AddScoped<IAudioService, AudioService>();
            builder.Services.AddScoped<ICloudAudioService, CloudAudioService>();
            builder.Services.AddScoped<IPhotoService, PhotoService>();
            builder.Services.AddScoped<ICustomIdentityUserDAL, CustomIdentityUserDAL>();
            builder.Services.AddScoped<ICustomIdentityUserService, CustomIdentityUserService>();
            builder.Services.AddScoped<IPlayListDAL, PlayListDAL>();
            builder.Services.AddScoped<IPlayListService, PlayListService>();
            builder.Services.AddScoped<IPlayListAudioDAL, PlayListAudioDAL>();
            builder.Services.AddScoped<IPlayListAudioService, PlayListAudioService>();
            builder.Services.AddScoped<IFileService, FileService>();

            var connection = builder.Configuration.GetConnectionString("Default");

            builder.Services.AddDbContext<SpotifyDBContext>(opt =>
            {
                opt.UseSqlServer(connection);
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("AllowReactApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.MapControllers();

            app.Run();

        }
    }
}