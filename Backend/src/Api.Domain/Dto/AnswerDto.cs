using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Dto
{
    public class AnswerDto
    {
        public string Description { get; set; }
        public bool IsCorrect {get;set;}
        public Guid QuestionId {get;set;}
    }
}