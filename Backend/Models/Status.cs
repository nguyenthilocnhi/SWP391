using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Status")]
public partial class Status
{
    [Key]
    public int Id { get; set; }

    [Column("Status")]
    [StringLength(255)]
    public string? Status1 { get; set; }

    [InverseProperty("Status")]
    public virtual ICollection<ConsultationBooking> ConsultationBookings { get; set; } = new List<ConsultationBooking>();

    [InverseProperty("Status")]
    public virtual ICollection<ServiceBooking> ServiceBookings { get; set; } = new List<ServiceBooking>();
}
