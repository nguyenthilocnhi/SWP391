using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Web.ModelFromDB;

public partial class WebUser
{
    [Key]
    [Column("UserID")]
    public int UserId { get; set; }

    [Required]
    [StringLength(100)]
    [RegularExpression(@"^[\p{L}\s]+$", ErrorMessage = "Họ tên chỉ được chứa chữ và dấu cách.")]
    public string FullName { get; set; } = null!;

    [Column("DOB")]
    public DateOnly? Dob { get; set; }

    [Required]
    [StringLength(10)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@gmail\.com$", ErrorMessage = "Email phải có định dạng đúng và kết thúc bằng @gmail.com")]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(20)]
    [Unicode(false)]
    [RegularExpression(@"^0[35789]\d{8}$", ErrorMessage = "Số điện thoại không hợp lệ.")]
    public string Phone { get; set; } = null!;

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [StringLength(250)]
    public string? Address { get; set; }

    [Required]
    [Column("RoleID")]
    public int RoleId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column("EmailVerify")]
    public bool EmailVerify { get; set; }

    [ForeignKey("RoleId")]
    [InverseProperty("WebUsers")]
    public virtual Role Role { get; set; } = null!;
}