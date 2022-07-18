﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_list_api.Context;
using todo_list_api.Models;
using todo_list_api.Services.Abstraction.Interfaces;

namespace todo_list_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ToDoListContext _context;
        private readonly IUsersService _usersService;
        

        public UsersController(ToDoListContext context, IUsersService service)
        {
            _context = context;
            _usersService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            try
            {
                var users = await _usersService.GetAllUsersAsync();

                if (users == null)
                    return NotFound();

                return Ok(users);
            }
            catch
            {
                return StatusCode(500);
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            try
            {
                var user = await _usersService.GetUserAsync(id);

                if (user == null)
                  return NotFound(); 

                return Ok(user);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.IdUser }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.IdUser == id);
        }
    }
}
