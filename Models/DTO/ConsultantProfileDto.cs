namespace Web.Models.DTO
{
    public class ConsultantProfileDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public string? Image { get; set; }
        public string Specialization { get; set; } = null!;
        public int ExperienceYears { get; set; }
        public string ConsultantLicense { get; set; } = null!;
        public string? ConsultantDescription { get; set; }
        public int Room { get; set; }
    }
}
