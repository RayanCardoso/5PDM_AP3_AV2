using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Dto
{
    public class QuestionUpdateDto
    {
        public Guid Id {get; set;}
        public string SubjectName { get; set; }
        public string Title { get; set; }
        public List<AnswerUpdateDto> Answers {get;set;} = new List<AnswerUpdateDto>();
    }
}