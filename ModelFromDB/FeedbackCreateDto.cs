using System.ComponentModel.DataAnnotations;

namespace Web.ModelFromDB
{
    public class FeedbackCreateDto
    {
        [Required]
        public int BookingId { get; set; }

        [Required]
        [RegularExpression(@"^[1-5]$", ErrorMessage = "Rating từ 1 đến 5.")]
        public int Rating { get; set; }

        [StringLength(250)]
        public string? Comment { get; set; }
    }
}
