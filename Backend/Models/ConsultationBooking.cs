using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ConsultationBooking")]
public partial class ConsultationBooking
{
    [Key]
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? ConsultantId { get; set; }

    public int? ConsultationTypeId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RegisterTime { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AppointmentTime { get; set; }

    public int? StatusId { get; set; }

    [StringLength(1000)]
    public string? Note { get; set; }

    [StringLength(100)]
    public string? PaymentMethod { get; set; }

    [ForeignKey("ConsultantId")]
    [InverseProperty("ConsultationBookings")]
    public virtual Consultant? Consultant { get; set; }

    [InverseProperty("ConsultationBooking")]
    public virtual ICollection<ConsultationFeedback> ConsultationFeedbacks { get; set; } = new List<ConsultationFeedback>();

    [ForeignKey("ConsultationTypeId")]
    [InverseProperty("ConsultationBookings")]
    public virtual ConsultationType? ConsultationType { get; set; }

    [ForeignKey("CustomerId")]
    [InverseProperty("ConsultationBookings")]
    public virtual Customer? Customer { get; set; }

    [ForeignKey("StatusId")]
    [InverseProperty("ConsultationBookings")]
    public virtual Status? Status { get; set; }
}
