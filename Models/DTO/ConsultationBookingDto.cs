namespace Web.Models.DTO
{
    // ConsultationBookingDto.cs
    public class ConsultationBookingDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string ConsultationType { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public DateTime AppointmentTime { get; set; }
        public string ConsultationLink { get; set; } = null!;
    }
}
