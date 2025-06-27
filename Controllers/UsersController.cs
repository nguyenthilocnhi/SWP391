using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using Web.JWT;
using Web.ModelFromDB;
using Web.Models;
using Web.Services;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private dbcontext db;
        private String secretKey;
        private IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        private readonly EmailOTP _otpService;


        public UsersController(dbcontext dbContext, IConfiguration configuration, IMemoryCache cache, EmailOTP otpService)
        {
            db = dbContext;
            secretKey = configuration["JwtSettings:SecretKey"];
            _configuration = configuration;
            _cache = cache;
            _otpService = otpService;
        }



        //[HttpPost("signup")]
        //public async Task<IActionResult> CreateUser([FromBody] CreatedUser dto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    // Kiểm tra Email và Phone đã tồn tại chưa
        //    bool emailExists = await db.WebUsers.AnyAsync(u => u.Email == dto.Email);


        //    if (emailExists)
        //    {
        //        return Conflict(new { message = "Email đã tồn tại." });
        //    }

        //    // Tạo WebUser mới
        //    var webUser = new WebUser
        //    {
        //        FullName = dto.FullName,
        //        Gender = dto.Gender,
        //        Dob = dto.Dob,
        //        Phone = dto.PhoneNumber,
        //        Email = dto.Email,
        //        Password = dto.Password,
        //        Address = dto.Address,
        //        RoleId = 1, // Giả sử 2 là Role mặc định cho user bình thường
        //        CreatedAt = DateTime.Now
        //    };

        //    // Tạo Customer mới
        //    var customer = new ModelFromDB.Customer
        //    {
        //        InsuranceCode = dto.InsuranceCode,
        //        MedicalHistory = null,
        //        HealthNote = null,
        //        CustomerNavigation = webUser
        //    };

        //    // Gắn Customer vào WebUser (đảm bảo EF hiểu quan hệ)
        //    webUser.Customer = customer;

        //    // Thêm vào context
        //    db.WebUsers.Add(webUser);

        //    // Lưu
        //    await db.SaveChangesAsync();

        //    return CreatedAtAction(nameof(CreateUser), new { id = webUser.UserId }, new { webUser.UserId });
        //}

        //[HttpPost("sendOTP")]
        //public async Task<IActionResult> SendOtp(String Email)
        //{


        //    var otp = _otpService.GenerateOtp(6);

        //    try
        //    {
        //        // Gửi email OTP
        //        await _otpService.SendEmailAsync(Email, "Xác minh email", $"Mã OTP xác minh của bạn là: {otp}");

        //        // Lưu vào cache trong 5 phút
        //        _cache.Set(Email, otp, TimeSpan.FromMinutes(5));

        //        return Ok(new { message = "Gửi OTP thành công" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Gửi email thất bại: " + ex.Message);
        //    }
        //}

        //[HttpPost("verifyOTP")]
        //public async Task<IActionResult> VerifyOtp(string email, string otp)
        //{
        //    // Lấy mã OTP từ cache
        //    if (_cache.TryGetValue(email, out string? cachedOtp))
        //    {
        //        if (cachedOtp == otp)
        //        {
        //            try
        //            {
        //                // Tìm người dùng theo email
        //                var user = await db.WebUsers.FirstOrDefaultAsync(u => u.Email == email);
        //                if (user == null)
        //                {
        //                    return NotFound(new { message = "Không tìm thấy người dùng với email đã cung cấp." });
        //                }

        //                // Cập nhật trạng thái xác thực email
        //                user.EmailVerify = true;
        //                await db.SaveChangesAsync();

        //                // Xóa OTP khỏi cache sau khi xác minh thành công
        //                _cache.Remove(email);

        //                return Ok(new { message = "Xác minh email thành công." });
        //            }
        //            catch (Exception ex)
        //            {
        //                return StatusCode(500, new { message = "Lỗi khi cập nhật cơ sở dữ liệu: " + ex.Message });
        //            }
        //        }
        //        else
        //        {
        //            return BadRequest(new { message = "Mã OTP không chính xác." });
        //        }
        //    }
        //    else
        //    {
        //        return BadRequest(new { message = "Mã OTP đã hết hạn hoặc không tồn tại." });
        //    }
        //}




        //[Authorize]
        //(Roles = "Consultant")
        [HttpPost("verify-token")]
        public IActionResult VerifyToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return Unauthorized("Token is missing.");
            }

            var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();
            var key = Encoding.UTF8.GetBytes(jwtSettings.SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(5)
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                // Ưu tiên đọc theo Claim chuẩn nếu có
                var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier || x.Type == "id");

                if (userIdClaim == null)
                {
                    return Unauthorized("Missing user ID in token.");
                }

                int userId = int.Parse(userIdClaim.Value);
                var user = db.Users.Include(u => u.Role).FirstOrDefault(u => u.Id == userId);

                if (user == null)
                {
                    return Unauthorized("User not found.");
                }

                return Ok(new
                {
                    UserID = user.Id,
                    Role = user.Role.Name
                });
            }
            catch (SecurityTokenExpiredException)
            {
                return Unauthorized("Token expired.");
            }
            catch (SecurityTokenException)
            {
                return Unauthorized("Invalid token.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal error: " + ex.Message);
            }
        }


        //[HttpPost("createFeedback")]
        //public async Task<IActionResult> CreateFeedback([FromBody] FeedbackCreateDto dto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var feedback = new Feedback
        //    {
        //        BookingId = dto.BookingId,
        //        Rating = dto.Rating,
        //        Comment = dto.Comment,
        //        CreatedAt = DateTime.Now
        //    };

        //    db.Feedbacks.Add(feedback);
        //    await db.SaveChangesAsync();

        //    return Ok(new { message = "Tạo feedback thành công", feedbackId = feedback.FeedbackId });
        //}

        [HttpPost("login")]
        public IActionResult Login(String email, String password)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();
            var user = db.Users
             .Include(u => u.Role)
             .FirstOrDefault(u => u.Email == email && u.Password == password);

            if (user != null)
            {
                // Giả lập thông tin người dùng
                int userId = user.Id;
                String userID = userId.ToString();
                String RoleName = user.Role.Name;


                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(secretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {

                        new Claim("id", userID),
                        new Claim(ClaimTypes.Role, RoleName),
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = jwtSettings.Issuer,
                    Audience = jwtSettings.Audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // Trả về token và userID riêng biệt
                return Ok(new { Token = tokenString, UserID = userId, Role = RoleName });
            }

            return Unauthorized();
        }

        

        [HttpGet("FAQ-list")]
        public async Task<IActionResult> GetAllFaqs()
        {
            var faqs = await db.Faqs
                .Select(f => new
                {
                    f.Question,
                    f.Answer
                })
                .ToListAsync();

            return Ok(faqs);
        }

        [HttpGet("Post-list")]
        public async Task<IActionResult> GetAllPosts()
        {
            var faqs = await db.Posts
                .Select(f => new
                {
                    f.Title,
                    f.Image
                })
                .ToListAsync();

            return Ok(faqs);
        }

        
    }




    
}
