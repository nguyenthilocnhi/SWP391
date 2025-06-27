using System.ComponentModel.DataAnnotations;

namespace Web.Models.DTO
{
    public class CreateWorkSlotDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Slot { get; set; }
    }
}
