
using System.ComponentModel.DataAnnotations;

namespace Web.Models.DTO;

public class RegisterDto
{
    [Required(ErrorMessage = "Họ tên là bắt buộc.")]
    [StringLength(255, ErrorMessage = "Họ tên không được vượt quá 255 ký tự.")]
    [RegularExpression(@"^[\p{L}\s]+$", ErrorMessage = "Họ tên chỉ được chứa chữ và dấu cách.")]
    public string FullName { get; set; } = null!;

    [DataType(DataType.Date, ErrorMessage = "Ngày sinh không hợp lệ.")]
    public DateOnly? DateOfBirth { get; set; }

    [Required(ErrorMessage = "Giới tính là bắt buộc.")]
    [StringLength(10, ErrorMessage = "Giới tính không được vượt quá 10 ký tự.")]
    public string Gender { get; set; } = null!;

    [Required(ErrorMessage = "Email là bắt buộc.")]
    [StringLength(255, ErrorMessage = "Email không được vượt quá 255 ký tự.")]
    [EmailAddress(ErrorMessage = "Email phải có định dạng hợp lệ.")]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@gmail\.com$", ErrorMessage = "Email phải kết thúc bằng @gmail.com.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
    [StringLength(255, MinimumLength = 8, ErrorMessage = "Mật khẩu phải từ 8 đến 255 ký tự.")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;

    [Required(ErrorMessage = "Số điện thoại là bắt buộc.")]
    [StringLength(20, ErrorMessage = "Số điện thoại không được vượt quá 20 ký tự.")]
    [RegularExpression(@"^0[35789]\d{8}$", ErrorMessage = "Số điện thoại không hợp lệ, phải bắt đầu bằng 0 và có 10 chữ số.")]
    public string Phone { get; set; } = null!;

    [StringLength(255, ErrorMessage = "Địa chỉ không được vượt quá 255 ký tự.")]
    public string? Address { get; set; }

    [Required(ErrorMessage = "RoleId là bắt buộc.")]
    [Range(1, int.MaxValue, ErrorMessage = "RoleId phải là số nguyên dương.")]
    public int RoleId { get; set; }
}

