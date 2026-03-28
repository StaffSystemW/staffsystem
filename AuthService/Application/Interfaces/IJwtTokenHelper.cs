using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Application.Interfaces;

public interface IJwtTokenHelper
{
    string GenerateRefreshToken(AppUser user, IConfiguration configuration);
    Task<string> GenerateToken(AppUser user, IConfiguration configuration, UserManager<AppUser> userManager);
}
