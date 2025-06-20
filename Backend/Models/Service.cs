using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Service")]
public partial class Service
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string? Name { get; set; }

    public int? EstimatedTime { get; set; }

    public int? Fee { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    public int? Room { get; set; }

    [InverseProperty("Service")]
    public virtual ICollection<ServiceBooking> ServiceBookings { get; set; } = new List<ServiceBooking>();
}
