using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Consultant")]
public partial class Consultant
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string? Specialization { get; set; }

    public int? ExperienceYears { get; set; }

    [StringLength(255)]
    public string? ConsultantLicense { get; set; }

    [StringLength(1000)]
    public string? ConsultantDescription { get; set; }

    public int? Room { get; set; }

    [InverseProperty("Consultant")]
    public virtual ICollection<ConsultationBooking> ConsultationBookings { get; set; } = new List<ConsultationBooking>();

    [ForeignKey("Id")]
    [InverseProperty("Consultant")]
    public virtual User IdNavigation { get; set; } = null!;

    [ForeignKey("ConsultantId")]
    [InverseProperty("Consultants")]
    public virtual ICollection<ConsultationType> ConsultationTypes { get; set; } = new List<ConsultationType>();
}
