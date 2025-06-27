using System.ComponentModel.DataAnnotations;

namespace Web.Models.DTO
{
    // UpdateConsultantProfileDto.cs
    public class UpdateConsultantProfileDto
    {
 
        [StringLength(255)]
        public string FullName { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }
        [StringLength(255)]
        public string? Address { get; set; }
   
        public string Specialization { get; set; } = null!;
        [Range(0, 100)]
        public int ExperienceYears { get; set; }
   
        public string ConsultantLicense { get; set; } = null!;
        public string? ConsultantDescription { get; set; }
        [Range(1, int.MaxValue)]
        public int Room { get; set; }
    }
}
