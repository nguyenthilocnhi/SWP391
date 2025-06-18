using System;
using System.ComponentModel.DataAnnotations;

namespace GenderHealthSystem.Models
{
    public class Question
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Sender { get; set; } = "Ẩn danh";

        [Required, MaxLength(100)]
        public string Topic { get; set; } = string.Empty;

        [Required, MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        public DateTime Time { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Chưa trả lời";
    }
}
