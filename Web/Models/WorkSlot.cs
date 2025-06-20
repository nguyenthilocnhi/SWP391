using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("WorkSlot")]
public partial class WorkSlot
{
    [Key]
    public int SlotId { get; set; }

    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public int Slot { get; set; }

    [ForeignKey("Slot")]
    [InverseProperty("WorkSlots")]
    public virtual Slot SlotNavigation { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("WorkSlots")]
    public virtual User User { get; set; } = null!;
}
