using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Web.ModelFromDB
{
    public class CreatedUser
    {
        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[\p{L}\s]+$", ErrorMessage = "Họ tên chỉ được chứa chữ và dấu cách.")]
        public string FullName { get; set; }

        public DateOnly? Dob { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"^0[35789]\d{8}$", ErrorMessage = "Số điện thoại không hợp lệ.")]
        public string PhoneNumber { get; set; }

        [StringLength(50)]
        public string? InsuranceCode { get; set; }

        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@gmail\.com$", ErrorMessage = "Email phải có định dạng đúng và kết thúc bằng @gmail.com")]
        public string Email { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        [RegularExpression(@"^(?=.*[^a-zA-Z0-9]).{8,}$", ErrorMessage = "Password phải có dài ít nhất 8 ký tự và có ít nhất 1 ký tự đặc biệt")]
        public string Password { get; set; } = null!;


        [StringLength(250)]
        public string? Address { get; set; }
    }
}
