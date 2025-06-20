using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ServiceFeedback")]
public partial class ServiceFeedback
{
    [Key]
    public int Id { get; set; }

    public int? ServiceBookingId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RatedTime { get; set; }

    public int? RatedStar { get; set; }

    [StringLength(1000)]
    public string? Comment { get; set; }

    [ForeignKey("ServiceBookingId")]
    [InverseProperty("ServiceFeedbacks")]
    public virtual ServiceBooking? ServiceBooking { get; set; }
}
