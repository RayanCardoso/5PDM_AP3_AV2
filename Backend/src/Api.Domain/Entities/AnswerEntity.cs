using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Entities
{
    public class AnswerEntity : BaseEntity
    {
        public string Description {get; set;}
        public bool IsCorrect {get;set;}
        public Guid QuestionId {get;set;}
        public QuestionEntity Question {get;set;}
    }
}