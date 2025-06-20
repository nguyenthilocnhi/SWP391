using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("User")]
[Index("Email", Name = "UQ__User__A9D1053468BF2D1B", IsUnique = true)]
public partial class User
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string FullName { get; set; } = null!;

    public DateOnly? DateOfBirth { get; set; }

    [StringLength(255)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string Password { get; set; } = null!;

    [StringLength(255)]
    public string? Address { get; set; }

    public int RoleId { get; set; }

    [StringLength(255)]
    public string? Image { get; set; }

    public int? PhoneNumber { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Consultant? Consultant { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Customer? Customer { get; set; }

    [InverseProperty("Consultant")]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    [ForeignKey("RoleId")]
    [InverseProperty("Users")]
    public virtual Role Role { get; set; } = null!;

    [InverseProperty("IdNavigation")]
    public virtual Staff? Staff { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<WorkSlot> WorkSlots { get; set; } = new List<WorkSlot>();
}
