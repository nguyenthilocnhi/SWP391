using Web.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenderHealthSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private IServiceRepository _serviceRepository;

        public ServiceController(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var services = _serviceRepository.GetAllServicesAsync().Result;
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving data: {ex.Message}");
            }
        }

        // GET: api/odata/services/{id}
        [HttpGet("{id}")]

        public async Task<IActionResult> GetServiceById(int id)
        {
            var services = await _serviceRepository.GetServiceByIdAsync(id);
            if (services == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = $"Service with id = {id} not found"
                });
            }
            return (IActionResult)Ok(services);
        }
    }
}
