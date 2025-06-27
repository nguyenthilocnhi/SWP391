using Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.Models.DTO;
using Web.Services;

[Route("api/workslots")]
[ApiController]
public class WorkSlotController : ControllerBase
{
    private readonly IWorkSlotService _workSlotService;

    public WorkSlotController(IWorkSlotService workSlotService)
    {
        _workSlotService = workSlotService;
    }

    // GET api/workslots/consultant/5
    [HttpGet("consultant/{consultantId}")]
    public async Task<IActionResult> GetWorkSlots(int consultantId)
    {
        try
        {
            var workSlots = await _workSlotService.GetWorkSlotsAsync(consultantId);
            return Ok(new { Status = 200, Title = "Thành công", Data = workSlots });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }

    // POST api/workslots
    [HttpPost]
    public async Task<IActionResult> CreateWorkSlot([FromBody] CreateWorkSlotDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var workSlot = await _workSlotService.CreateWorkSlotAsync(dto);
            return CreatedAtAction(nameof(GetWorkSlots), new { consultantId = workSlot.UserId }, workSlot);
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

    //// PUT api/workslots/5
    //[HttpPut("{slotId}")]
    //public async Task<IActionResult> UpdateWorkSlot(int slotId, [FromBody] CreateWorkSlotDto dto)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(ModelState);

    //    try
    //    {
    //        var result = await _workSlotService.UpdateWorkSlotAsync(slotId, dto);
    //        if (!result)
    //            return NotFound(new { Status = 404, Title = "Không tìm thấy", Message = $"WorkSlot với ID {slotId} không tồn tại." });

    //        return NoContent();
    //    }
    //    catch (ArgumentException ex)
    //    {
    //        return BadRequest(new { Status = 400, Title = "Dữ liệu không hợp lệ", Message = ex.Message });
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
    //    }
    //}

    // DELETE api/workslots/5
    [HttpDelete("{slotId}")]
    public async Task<IActionResult> DeleteWorkSlot(int slotId)
    {
        try
        {
            var result = await _workSlotService.DeleteWorkSlotAsync(slotId);
            if (!result)
                return NotFound(new { Status = 404, Title = "Không tìm thấy", Message = $"WorkSlot với ID {slotId} không tồn tại." });

            return Ok("Delete success");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Status = 500, Title = "Lỗi hệ thống", Message = ex.Message });
        }
    }
}