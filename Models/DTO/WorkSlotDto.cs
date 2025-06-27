namespace Web.Models.DTO
{
    public class WorkSlotDto
    {
        public int SlotId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int Slot { get; set; }
        public string SlotTime { get; set; } = null!;
    }
}
