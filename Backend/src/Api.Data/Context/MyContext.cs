using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Mapping;
using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Context
{
    public class MyContext : DbContext
    {
        public DbSet<QuestionEntity> Question { get; set; }
        public DbSet<AnswerEntity> Answer { get; set; }

        public MyContext (DbContextOptions<MyContext> options) : base (options) {}
    
        protected override void OnModelCreating (ModelBuilder modelBuilder){
            base.OnModelCreating (modelBuilder);
            modelBuilder.Entity<QuestionEntity> (new QuestionMap().Configure);
        }
    }
}