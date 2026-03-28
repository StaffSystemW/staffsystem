using Microsoft.EntityFrameworkCore;
using Infrastructure.Context;
using Microsoft.AspNetCore.Identity;
using Domain.Models;

namespace Infrastructure.Context;

public static class SeedData
{
    public static async Task InitializeAsync(
        DataContext context,
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        await context.Database.MigrateAsync();

        const string adminRole = "Admin";

        if (!await roleManager.RoleExistsAsync(adminRole))
        {
            await roleManager.CreateAsync(new IdentityRole(adminRole));
        }

        var existingUser = await userManager.FindByEmailAsync("demo@staffsystem.com");
        if (existingUser != null)
            return;

        var demoUser = new AppUser
        {
            Id = DemoIds.DemoUserId,
            UserName = "demo@staffsystem.com",
            Email = "demo@staffsystem.com",
            FirstName = "Demo",
            LastName = "User",
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(demoUser, "Demo123!");

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(demoUser, adminRole);
        }
        else
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to seed demo user: {errors}");
        }
    }
}