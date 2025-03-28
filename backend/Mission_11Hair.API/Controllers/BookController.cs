using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission_11Hair.API.Data;

namespace Mission_11Hair.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, [FromQuery(Name = "category")] List<string> categories = null)
        {
                var query = _bookContext.Books.AsQueryable();

                // Filter by categories if any are selected
                if (categories != null && categories.Any())
                {
                    query = query.Where(b => categories.Contains(b.Category));
                }

            var totalNumBooks = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someObject = new
            {
                Books = something,
                totalNumBooks = totalNumBooks
            };
            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var Category = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(Category);
        }
    }
}
