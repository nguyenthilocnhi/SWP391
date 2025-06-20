using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ConsultationFeedback")]
public partial class ConsultationFeedback
{
    [Key]
    public int Id { get; set; }

    public int? ConsultationBookingId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RatedTime { get; set; }

    public int? RatedStar { get; set; }

    [StringLength(1000)]
    public string? Comment { get; set; }

    [ForeignKey("ConsultationBookingId")]
    [InverseProperty("ConsultationFeedbacks")]
    public virtual ConsultationBooking? ConsultationBooking { get; set; }
}
