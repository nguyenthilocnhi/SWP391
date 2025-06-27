using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.ModelFromDB;

[Table("Register")]
public partial class Register
{
    [Key]
    [Column("RegistID")]
    public int RegistId { get; set; }

    [Column("SlotID")]
    public int SlotId { get; set; }

    [Column("ConsultantID")]
    public int ConsultantId { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? Note { get; set; }

    [ForeignKey("ConsultantId")]
    [InverseProperty("Registers")]
    public virtual Consultant Consultant { get; set; } = null!;

    [ForeignKey("SlotId")]
    [InverseProperty("Registers")]
    public virtual Slot Slot { get; set; } = null!;
}
