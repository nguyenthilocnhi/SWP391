using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ConsultationType")]
public partial class ConsultationType
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string? Type { get; set; }

    public int? EstimatedTime { get; set; }

    public int? Fee { get; set; }

    [InverseProperty("ConsultationType")]
    public virtual ICollection<ConsultationBooking> ConsultationBookings { get; set; } = new List<ConsultationBooking>();

    [ForeignKey("ConsultationTypeId")]
    [InverseProperty("ConsultationTypes")]
    public virtual ICollection<Consultant> Consultants { get; set; } = new List<Consultant>();

    [ForeignKey("ConsultationId")]
    [InverseProperty("Consultations")]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
