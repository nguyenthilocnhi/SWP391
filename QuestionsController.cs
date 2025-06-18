using Microsoft.AspNetCore.Mvc;
using GenderHealthSystem.Data;
using GenderHealthSystem.Models;

namespace GenderHealthSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly GenderhealthContext _context;

        public QuestionsController(GenderhealthContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            question.Time = DateTime.Now;
            question.Status = "Chưa trả lời";
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        [HttpGet]
        public IActionResult GetAllQuestions()
        {
            return Ok(_context.Questions.OrderByDescending(q => q.Time).ToList());
        }
    }
}
