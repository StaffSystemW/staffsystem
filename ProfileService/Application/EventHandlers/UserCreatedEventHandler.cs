using Application.Contracts.Events;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers;

public class UserCreatedEventHandler
{
    private readonly IProfileRepository _profileRepository;

    public UserCreatedEventHandler(IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }

    public async Task Handle(UserCreatedEvent evt)
    {
        Console.WriteLine($"[HANDLER START] UserId: {evt.UserId}");

        var profile = new ProfileEntity
        {
            Id = Guid.NewGuid(),
            UserId = evt.UserId,
            EmailAddress = evt.Email,
            FirstName = "",
            LastName = "",
            PhoneNumber = "",
            ImageUrl = "",
            AddressId = null,
            IsProfileCompleted = false
        };

        try
        {
            await _profileRepository.AddAsync(profile);
            await _profileRepository.SaveAsync();
            Console.WriteLine($"[PROFILE CREATED] UserId: {evt.UserId}");
        }
        catch (DbUpdateException)
        {
            Console.WriteLine("Duplicate profile prevented by DB constraint");
        }
    }
}
