using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

[Table("Post")]
public partial class Post
{
    [Key]
    public int Id { get; set; }

    public int? ConsultantId { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Image { get; set; }

    public DateOnly? PostedDate { get; set; }

    [ForeignKey("ConsultantId")]
    [InverseProperty("Posts")]
    public virtual User? Consultant { get; set; }

    [InverseProperty("Post")]
    public virtual ICollection<PostDetail> PostDetails { get; set; } = new List<PostDetail>();

    [ForeignKey("PostId")]
    [InverseProperty("Posts")]
    public virtual ICollection<ConsultationType> Consultations { get; set; } = new List<ConsultationType>();
}
