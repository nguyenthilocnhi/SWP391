using Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.Models.DTO;
using Web.Services;

[Route("api/consultant")]
[ApiController]
public class ConsultantController : ControllerBase
{
    private readonly IConsultantService _consultantService;

    public ConsultantController(IConsultantService consultantService)
    {
        _consultantService = consultantService;
    }

    // GET api/consultant/5
    [HttpGet("{consultantId}")]
    public async Task<IActionResult> GetProfile(int consultantId)
    {
        try
        {
            var profile = await _consultantService.GetConsultantProfileAsync(consultantId);
            return Ok(new { Status = 200, Title = "Thành công", Data = profile });
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { Status = 404, Title = "Không tìm thấy", Message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }

    // PUT api/consultant/5
    [HttpPut("{consultantId}")]
    public async Task<IActionResult> UpdateProfile(int consultantId, [FromBody] UpdateConsultantProfileDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var profile = await _consultantService.UpdateConsultantProfileAsync(consultantId, dto);
            return Ok(new { Status = 200, Title = "Thành công", Data = profile });
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { Status = 404, Title = "Không tìm thấy", Message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }

    // POST api/consultant/5/change-password
    [HttpPost("{consultantId}/change-password")]
    public async Task<IActionResult> ChangePassword(int consultantId, [FromBody] ChangePasswordDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var result = await _consultantService.ChangePasswordAsync(consultantId, dto);
            if (!result)
                return BadRequest(new { Status = 400, Title = "Lỗi", Message = "Mật khẩu hiện tại không đúng." });

            return Ok(new { Status = 200, Title = "Thành công", Message = "Đổi mật khẩu thành công." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }

    // POST api/consultant/5/profile-picture
    [HttpPost("{consultantId}/profile-picture")]
    public async Task<IActionResult> UpdateProfilePicture(int consultantId, string image)
    {
        try
        {
            var profile = await _consultantService.UpdateProfilePictureAsync(consultantId, image);
            return Ok(new { Status = 200, Title = "Thành công", Data = profile });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Status = 400, Title = "Dữ liệu không hợp lệ", Message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }
}