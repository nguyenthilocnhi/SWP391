using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("BookingRecord")]
public partial class BookingRecord
{
    [Key]
    [Column("BookingRecordID")]
    public int BookingRecordId { get; set; }

    [Column("BookingID")]
    public int BookingId { get; set; }

    [Column("ServiceID")]
    public int ServiceId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ServicePerfomedDate { get; set; }

    public int? ServiceActualDuration { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? ConsultantNotesOnService { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? CustomerOutcome { get; set; }

    public bool? IsCompleted { get; set; }

    [ForeignKey("BookingId")]
    [InverseProperty("BookingRecords")]
    public virtual Booking Booking { get; set; } = null!;

    [ForeignKey("ServiceId")]
    [InverseProperty("BookingRecords")]
    public virtual Service Service { get; set; } = null!;
}
