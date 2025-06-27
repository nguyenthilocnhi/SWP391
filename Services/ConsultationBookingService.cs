using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Models.DTO;

namespace Web.Services
{
    // ConsultationBookingService.cs  
    public class ConsultationBookingService : IConsultationBookingService
    {
        private readonly dbcontext _context;

        public ConsultationBookingService(dbcontext context)
        {
            _context = context;
        }

        public async Task<List<ConsultationBookingDto>> GetConsultantBookingsAsync(int consultantId)
        {
            return await _context.ConsultationBookings
                .Include(cb => cb.Customer).ThenInclude(c => c.IdNavigation)
                .Include(cb => cb.ConsultationType)
                .Where(cb => cb.ConsultantId == consultantId)
                .Select(cb => new ConsultationBookingDto
                {
                    Id = cb.Id,
                    CustomerName = cb.Customer.IdNavigation.FullName,
                    ConsultationType = cb.ConsultationType.Type,
                    CustomerPhone = cb.Customer.IdNavigation.Address,
                    CustomerEmail = cb.Customer.IdNavigation.Email,
                    AppointmentTime = cb.AppointmentTime ?? DateTime.MinValue, // Fix for CS0266 and CS8629  
                    ConsultationLink = $"https://consultancy.link/{cb.Id}"
                })
                .ToListAsync();
        }
    }
}
