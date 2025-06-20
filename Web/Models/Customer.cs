using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Customer")]
public partial class Customer
{
    [Key]
    public int Id { get; set; }

    [StringLength(1000)]
    public string? MedicalHistory { get; set; }

    [InverseProperty("Customer")]
    public virtual ICollection<ConsultationBooking> ConsultationBookings { get; set; } = new List<ConsultationBooking>();

    [ForeignKey("Id")]
    [InverseProperty("Customer")]
    public virtual User IdNavigation { get; set; } = null!;

    [InverseProperty("Customer")]
    public virtual ICollection<ServiceBooking> ServiceBookings { get; set; } = new List<ServiceBooking>();
}
