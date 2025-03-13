using Identity.Business.Services.Abstracts;
using Identity.Business.Services.Concretes;
using Identity.DataAccess.Data;
using Identity.DataAccess.Repositories.Abstracts;
using Identity.DataAccess.Repositories.Concretes;
using Identity.WebApi.Services.Abstracts;
using Identity.WebApi.Services.Concretes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SpotifyCore.Entities;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

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

//builder.WebHost.UseUrls("https://*:5000");

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});


builder.Services.AddScoped<ICustomIdentityUserDAL, CustomIdentityUserDAL>();
builder.Services.AddScoped<ICustomIdentityUserService, CustomIdentityUserService>();
builder.Services.AddScoped<IFileService, FileService>();

var connection = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<SpotifyDBContext>(option =>
{
    option.UseSqlServer(connection);
});

builder.Services.AddIdentity<CustomIdentityUser, CustomIdentityRole>(options =>
{
    options.Password.RequiredLength = 8;
    //options.Password.RequireNonAlphanumeric = true;
    //options.Password.RequireDigit = true;
    //options.Password.RequireUppercase = true;
    //options.Password.RequireLowercase = true;
})
    .AddEntityFrameworkStores<SpotifyDBContext>()
    .AddDefaultTokenProviders();

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

builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthorization(Options =>
{
    Options.AddPolicy("ClientPolicy", policy => policy.RequireRole("Client"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSession();
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

app.MapControllers();

app.Run();