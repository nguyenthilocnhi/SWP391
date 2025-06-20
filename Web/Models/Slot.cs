using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Slot")]
public partial class Slot
{
    [Key]
    [Column("Slot")]
    public int Slot1 { get; set; }

    [StringLength(50)]
    public string Time { get; set; } = null!;

    [InverseProperty("SlotNavigation")]
    public virtual ICollection<WorkSlot> WorkSlots { get; set; } = new List<WorkSlot>();
}
