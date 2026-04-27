namespace Domain.Entities;

public class EmployeeEntity
{
    public string Id { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public string Lastname { get; set; } = null!;
    public string Level { get; set; } = null!;
    public IEnumerable<AreaEntity> Areas { get; set; } = null!;
}
