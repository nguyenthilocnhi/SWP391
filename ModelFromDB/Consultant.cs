using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Consultant")]
public partial class Consultant
{
    [Key]
    [Column("ConsultantID")]
    public int ConsultantId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Specialization { get; set; }

    public int? ExperienceYears { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ConsultantLicense { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? ConsultantDescription { get; set; }

    [InverseProperty("Consultant")]
    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    [ForeignKey("ConsultantId")]
    [InverseProperty("Consultant")]
    public virtual WebUser ConsultantNavigation { get; set; } = null!;

    [InverseProperty("Consultant")]
    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();
}
