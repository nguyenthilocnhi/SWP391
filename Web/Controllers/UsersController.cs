using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using Web.DTO;
using Web.JWT;
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
        private const int PageSize = 3;


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

        [HttpGet("GetPostByPage")]
        public async Task<IActionResult> GetPostByPage([FromQuery] int page = 1)
        {
            if (page < 1) page = 1;

            // Đếm tổng số bài viết
            var totalPosts = await db.Posts.CountAsync();
            var totalPages = (int)Math.Ceiling(totalPosts / (double)PageSize);

            // Lấy bài viết theo trang
            var posts = await db.Posts
                .OrderByDescending(p => p.PostedDate)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Select(p => new
                {
                    p.Title,
                    p.Image,
                    p.PostedDate
                })
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                totalPages = totalPages,
                posts = posts
            });
        }

        [HttpGet("Get-post-details")]
        public async Task<IActionResult> GetAllPostDetailsByPostID(int postId)
        {
            var postDetails = await db.PostDetails
                .Where(pd => pd.PostId == postId)
                .OrderBy(pd => pd.OrderIndex) // Nếu muốn sắp xếp theo thứ tự
                .Select(pd => new
                {
                    pd.PostDetailId,
                    pd.PostId,
                    pd.OrderIndex,
                    pd.TypeId,
                    pd.Content,
                    TypeName = pd.Type != null ? pd.Type.Type : null  // nếu muốn lấy tên loại nội dung
                })
                .ToListAsync();

            return Ok(postDetails);
        }


        [HttpGet("GetServicesByPage")]
        public async Task<IActionResult> GetServicesByPage([FromQuery] int page = 1)
        {
            if (page < 1) page = 1;

            // Đếm tổng số service
            var totalServices = await db.Services.CountAsync();
            var totalPages = (int)Math.Ceiling(totalServices / (double)PageSize);

            // Lấy các service theo trang
            var services = await db.Services
                .OrderBy(s => s.Id)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Select(s => new
                {
                    s.Id,
                    s.Name,
                    s.EstimatedTime,
                    s.Fee                  
                })
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                totalPages = totalPages,
                services = services
            });
        }

        [HttpGet("GetConsultationsByPage")]
        public async Task<IActionResult> GetConsultationsByPage([FromQuery] int page = 1)
        {
            if (page < 1) page = 1;

            // Đếm tổng số ConsultationType
            var totalCount = await db.ConsultationTypes.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)PageSize);

            // Lấy dữ liệu theo trang
            var items = await db.ConsultationTypes
                .OrderBy(ct => ct.Id)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Select(ct => new
                {
                    ct.Id,
                    ct.Type,
                    ct.EstimatedTime,
                    ct.Fee
                })
                .ToListAsync();

            return Ok(new
            {
                currentPage = page,
                totalPages = totalPages,
                consultationTypes = items
            });
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser dto)
        {
            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin
            user.FullName = dto.FullName;
            user.DateOfBirth = dto.DateOfBirth;
            
            
            user.Address = dto.Address;
            user.PhoneNumber = dto.PhoneNumber;


            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Có thể lỗi do trùng email (unique index)
                return BadRequest(new { error = ex.Message });
            }

            return Ok(user);
        }

        [HttpGet("GetAllServiceBookingsByUserId")]
        public async Task<ActionResult<IEnumerable<ServiceBooking>>> GetAllServiceBookingsByUserId(int customerId)
        {
            var bookings = await db.ServiceBookings
                .Include(u => u.ServiceId)
                .Where(sb => sb.CustomerId == customerId)
                .Select(sb => new
                {
                    sb.Id,
                    ServiceName = sb.Service != null ? sb.Service.Name : null,
                    sb.Result,
                    AppointmentDate = sb.AppointmentTime.Value.ToString("dd/MM/yyyy"),
                })
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound(new { message = "No service bookings found for this user." });
            }

            return Ok(bookings);
        }

        [HttpGet("GetAllConsultationBookingsByUserId")]
        public async Task<ActionResult<IEnumerable<ConsultationBooking>>> GetAllConsultationBookingsByUserId(int customerId)
        {
            var bookings = await db.ConsultationBookings
                .Where(cb => cb.CustomerId == customerId)
                .Select(cb => new
                {
                    cb.Id,
                    ConsultationType = cb.ConsultationType != null ? cb.ConsultationType.Type : null,
                    cb.PaymentMethod,
                    AppointmentDate = cb.AppointmentTime.Value.ToString("dd/MM/yyyy"),
                })
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound(new { message = "No consultation bookings found for this user." });
            }

            return Ok(bookings);
        }



    }


    
}
