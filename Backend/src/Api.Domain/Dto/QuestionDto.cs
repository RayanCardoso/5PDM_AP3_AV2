using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Dto
{
    public class QuestionDto
    {
        public string SubjectName { get; set; }
        public string Title { get; set; }
        public List<AnswerDto> Answers {get;set;} = new List<AnswerDto>();
    }
}