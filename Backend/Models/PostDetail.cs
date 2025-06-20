using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("PostDetail")]
public partial class PostDetail
{
    [Key]
    public int PostDetailId { get; set; }

    public int PostId { get; set; }

    public int? OrderIndex { get; set; }

    public int? TypeId { get; set; }

    public string? Content { get; set; }

    [ForeignKey("PostId")]
    [InverseProperty("PostDetails")]
    public virtual Post Post { get; set; } = null!;

    [ForeignKey("TypeId")]
    [InverseProperty("PostDetails")]
    public virtual ContentPostType? Type { get; set; }
}
