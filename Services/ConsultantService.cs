using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Models.DTO;
using Web.Services;
using System;

public class ConsultantService : IConsultantService
{
    private readonly dbcontext _context; // Sửa từ dbcontext thành ApplicationDbContext
    private readonly IWebHostEnvironment _environment;

    public ConsultantService(dbcontext context, IWebHostEnvironment environment)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _environment = environment ?? throw new ArgumentNullException(nameof(environment));
    }

    public async Task<ConsultantProfileDto> GetConsultantProfileAsync(int consultantId)
    {
        var consultant = await _context.Consultants
            .Include(c => c.IdNavigation)
            .FirstOrDefaultAsync(c => c.Id == consultantId);

        if (consultant == null)
            throw new ArgumentException("Consultant không tồn tại.");

        return new ConsultantProfileDto
        {
            Id = consultant.Id,
            FullName = consultant.IdNavigation.FullName,
            DateOfBirth = consultant.IdNavigation.DateOfBirth,
            Email = consultant.IdNavigation.Email,
            Address = consultant.IdNavigation.Address,
            Image = consultant.IdNavigation.Image,
            Specialization = consultant.Specialization,
            ExperienceYears = consultant.ExperienceYears.GetValueOrDefault(),
            ConsultantLicense = consultant.ConsultantLicense,
            ConsultantDescription = consultant.ConsultantDescription,
            Room = consultant.Room.GetValueOrDefault()
        };
    }

    public async Task<ConsultantProfileDto> UpdateConsultantProfileAsync(int consultantId, UpdateConsultantProfileDto dto)
    {
        var consultant = await _context.Consultants
            .Include(c => c.IdNavigation)
            .FirstOrDefaultAsync(c => c.Id == consultantId);

        if (consultant == null)
            throw new ArgumentException("Consultant không tồn tại.");

        // Kiểm tra RoleId của User để đảm bảo là Consultant
        if (consultant.IdNavigation.RoleId != 2) // 2 là RoleId của Consultant
            throw new ArgumentException("Người dùng không phải là Consultant.");

        // Chỉ cập nhật các trường có giá trị hợp lệ
        if (!string.IsNullOrEmpty(dto.FullName))
            consultant.IdNavigation.FullName = dto.FullName;
        if (dto.DateOfBirth.HasValue)
            consultant.IdNavigation.DateOfBirth = dto.DateOfBirth;
        if (!string.IsNullOrEmpty(dto.Address))
            consultant.IdNavigation.Address = dto.Address;
        if (!string.IsNullOrEmpty(dto.Specialization))
            consultant.Specialization = dto.Specialization;
        if (dto.ExperienceYears > 0) // Tránh ghi đè bằng 0
            consultant.ExperienceYears = dto.ExperienceYears;
        if (!string.IsNullOrEmpty(dto.ConsultantLicense))
            consultant.ConsultantLicense = dto.ConsultantLicense;
        if (!string.IsNullOrEmpty(dto.ConsultantDescription))
            consultant.ConsultantDescription = dto.ConsultantDescription;
        if (dto.Room > 0) // Tránh ghi đè bằng 0
            consultant.Room = dto.Room;

        await _context.SaveChangesAsync();

        return await GetConsultantProfileAsync(consultantId);
    }

    public async Task<bool> ChangePasswordAsync(int consultantId, ChangePasswordDto dto)
    {
        var user = await _context.Users.FindAsync(consultantId);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.Password))
            return false;

        user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ConsultantProfileDto> UpdateProfilePictureAsync(int consultantId, string image)
    {
        if (image == null || image.Length == 0)
            throw new ArgumentException("Hình ảnh không hợp lệ.");

        var consultant = await _context.Consultants
            .Include(c => c.IdNavigation)
            .FirstOrDefaultAsync(c => c.Id == consultantId);

        if (consultant == null)
            throw new ArgumentException("Consultant không tồn tại.");
        

        consultant.IdNavigation.Image = image;
        await _context.SaveChangesAsync();

        return await GetConsultantProfileAsync(consultantId);
    }
}