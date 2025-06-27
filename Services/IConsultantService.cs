using Web.Models.DTO;

namespace Web.Services
{
    public interface IConsultantService
    {
        Task<ConsultantProfileDto> GetConsultantProfileAsync(int consultantId);
        Task<ConsultantProfileDto> UpdateConsultantProfileAsync(int consultantId, UpdateConsultantProfileDto dto);
        Task<bool> ChangePasswordAsync(int consultantId, ChangePasswordDto dto);
        Task<ConsultantProfileDto> UpdateProfilePictureAsync(int consultantId, string image);
    }
}
