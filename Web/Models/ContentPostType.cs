using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("ContentPostType")]
public partial class ContentPostType
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string? Type { get; set; }

    [InverseProperty("Type")]
    public virtual ICollection<PostDetail> PostDetails { get; set; } = new List<PostDetail>();
}
