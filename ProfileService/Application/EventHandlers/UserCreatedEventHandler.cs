using Application.Contracts.Events;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers;

public class UserCreatedEventHandler(IProfileRepository profileRepository)
{
    private readonly IProfileRepository _profileRepository = profileRepository;

    public async Task Handle(UserCreatedEvent evt)
    {

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
        }
        catch (DbUpdateException)
        {
        }
    }
}
