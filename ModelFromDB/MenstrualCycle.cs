using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("MenstrualCycle")]
public partial class MenstrualCycle
{
    [Key]
    [Column("CycleID")]
    public int CycleId { get; set; }

    [Column("CustomerID")]
    public int CustomerId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    [ForeignKey("CustomerId")]
    [InverseProperty("MenstrualCycles")]
    public virtual Customer Customer { get; set; } = null!;
}
