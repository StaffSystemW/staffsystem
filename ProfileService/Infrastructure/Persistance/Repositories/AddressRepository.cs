using Infrastructure.Persistance.Context;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;

namespace Infrastructure.Persistance.Repositories;

public class AddressRepository(DataContext dataContext) : BaseRepository<AddressEntity>(dataContext), IAddressRepository
{
    public override async Task<AddressEntity> AddAsync(AddressEntity entity)
    {
        var existingAddress = await _dataContext.Addresses.FirstOrDefaultAsync(x =>
            x.ZipCode == entity.ZipCode &&
            x.City == entity.City &&
            x.Country == entity.Country &&
            x.State == entity.State &&
            x.Street == entity.Street
            );
        if (existingAddress != null)
        {
            return existingAddress;
        }

        entity.Id = 0;
        var result = await _dataContext.Addresses.AddAsync(entity);
        _dataContext.SaveChanges();

        return result.Entity;
    }
}