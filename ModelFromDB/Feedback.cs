using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Feedback")]
public partial class Feedback
{
    [Key]
    [Column("FeedbackID")]
    public int FeedbackId { get; set; }

    [Column("BookingID")]
    public int BookingId { get; set; }

    [RegularExpression(@"\b(10|[1-9])\b", ErrorMessage = "Rating từ 1 đến 10.")]

    public int Rating { get; set; }

    [StringLength(250)]
    
    public string? Comment { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [ForeignKey("BookingId")]
    [InverseProperty("Feedbacks")]
    public virtual Booking Booking { get; set; } = null!;

    
    
}
