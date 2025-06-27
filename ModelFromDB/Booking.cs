using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Booking")]
public partial class Booking
{
    [Key]
    [Column("BookingID")]
    public int BookingId { get; set; }

    [Column("CustomerID")]
    public int CustomerId { get; set; }

    [Column("ConsultantID")]
    public int ConsultantId { get; set; }

    [Column("ServiceID")]
    public int ServiceId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime BookingDate { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string? Type { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? Note { get; set; }

    [InverseProperty("Booking")]
    public virtual ICollection<BookingRecord> BookingRecords { get; set; } = new List<BookingRecord>();

    [ForeignKey("ConsultantId")]
    [InverseProperty("Bookings")]
    public virtual Consultant Consultant { get; set; } = null!;

    [ForeignKey("CustomerId")]
    [InverseProperty("Bookings")]
    public virtual Customer Customer { get; set; } = null!;

    [InverseProperty("Booking")]
    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    [ForeignKey("ServiceId")]
    [InverseProperty("Bookings")]
    public virtual Service Service { get; set; } = null!;
}
