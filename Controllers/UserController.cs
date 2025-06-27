using Web.Models;
using Microsoft.AspNetCore.Mvc;
using Web.Repositories;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Web.Models.DTO;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IWebUserRepository _repo;
    private readonly dbcontext _context;

    public UserController(IWebUserRepository repo, dbcontext context)
    {
        _repo = repo;
        _context = context;
    }

    
     
  
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        // Kiểm tra xác thực model
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(new
            {
                Status = 400,
                Title = "Xác thực thất bại",
                Errors = errors
            });
        }

        // Kiểm tra xem RoleId có tồn tại trong bảng Role không
        var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
        if (!roleExists)
        {
            return BadRequest($"RoleId {dto.RoleId} không tồn tại trong cơ sở dữ liệu.");
        }

        // Kiểm tra email hoặc số điện thoại đã tồn tại
        if (await _repo.IsEmailOrPhoneTakenAsync(dto.Email))
        {
            return BadRequest("Email hoặc số điện thoại đã tồn tại.");
        }

        // Ánh xạ RegisterDto sang User
        var user = new User
        {
            FullName = dto.FullName,
            DateOfBirth = dto.DateOfBirth,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Address = $"{dto.Address ?? ""} | Phone: {dto.Phone} | Gender: {dto.Gender}",
            RoleId = dto.RoleId,
            Image = null
        };

        // Thêm user vào cơ sở dữ liệu
        try
        {
            await _repo.AddUserAsync(user);
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Lỗi khi lưu user vào cơ sở dữ liệu: {ex.Message}");
        }

        return Ok("Đăng ký thành công."+dto);
    }
}