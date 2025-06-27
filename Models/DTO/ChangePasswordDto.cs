using System.ComponentModel.DataAnnotations;

namespace Web.Models.DTO
{
    // ChangePasswordDto.cs
    public class ChangePasswordDto
    {
        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string CurrentPassword { get; set; } = null!;
        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string NewPassword { get; set; } = null!;
    }
}
