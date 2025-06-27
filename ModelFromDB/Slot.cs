using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Slot")]
public partial class Slot
{
    [Key]
    [Column("SlotID")]
    public int SlotId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string TimeShift { get; set; } = null!;

    public TimeOnly EndTime { get; set; }

    public DateOnly Date { get; set; }

    [InverseProperty("Slot")]
    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();
}
