namespace Web.DTO
{
    public class UpdateUser
    {
        public string FullName { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }              
        public string? Address { get; set; }        
        public int? PhoneNumber { get; set; }
    }
}
