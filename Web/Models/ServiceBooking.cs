using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ServiceBooking")]
public partial class ServiceBooking
{
    [Key]
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? ServiceId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RegisterTime { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AppointmentTime { get; set; }

    public int? StatusId { get; set; }

    [StringLength(1000)]
    public string? Result { get; set; }

    [StringLength(100)]
    public string? PaymentMethod { get; set; }

    [ForeignKey("CustomerId")]
    [InverseProperty("ServiceBookings")]
    public virtual Customer? Customer { get; set; }

    [ForeignKey("ServiceId")]
    [InverseProperty("ServiceBookings")]
    public virtual Service? Service { get; set; }

    [InverseProperty("ServiceBooking")]
    public virtual ICollection<ServiceFeedback> ServiceFeedbacks { get; set; } = new List<ServiceFeedback>();

    [ForeignKey("StatusId")]
    [InverseProperty("ServiceBookings")]
    public virtual Status? Status { get; set; }
}
