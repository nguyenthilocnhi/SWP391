using Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.Services;

[Route("api/consultationbookings")]
[ApiController]
public class ConsultationBookingController : ControllerBase
{
    private readonly IConsultationBookingService _consultationBookingService;

    public ConsultationBookingController(IConsultationBookingService consultationBookingService)
    {
        _consultationBookingService = consultationBookingService;
    }

    // GET api/consultationbookings/consultant/5
    [HttpGet("consultant/{consultantId}")]
    public async Task<IActionResult> GetConsultantBookings(int consultantId)
    {
        try
        {
            var bookings = await _consultationBookingService.GetConsultantBookingsAsync(consultantId);
            return Ok(new { Status = 200, Title = "Thành công", Data = bookings });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }
}