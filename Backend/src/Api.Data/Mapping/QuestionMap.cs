using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping{
    public class QuestionMap : IEntityTypeConfiguration<QuestionEntity>{

        public void Configure(EntityTypeBuilder<QuestionEntity> builder){
            
            builder.ToTable("Question");

            builder.HasKey(q => q.Id);

            builder.HasIndex(q => q.SubjectName);
                   
            builder.HasMany(q => q.AnswerList).WithOne(al => al.Question).HasForeignKey(a => a.QuestionId);
        }
    }
}