using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Customer")]
public partial class Customer
{
    [Key]
    [Column("CustomerID")]
    public int CustomerId { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? MedicalHistory { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? InsuranceCode { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? HealthNote { get; set; }

    [InverseProperty("Customer")]
    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    [ForeignKey("CustomerId")]
    [InverseProperty("Customer")]
    public virtual WebUser CustomerNavigation { get; set; } = null!;

    [InverseProperty("Customer")]
    public virtual ICollection<MenstrualCycle> MenstrualCycles { get; set; } = new List<MenstrualCycle>();
}
