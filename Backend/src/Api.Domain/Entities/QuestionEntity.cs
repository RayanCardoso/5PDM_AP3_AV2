using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Entities
{
    public class QuestionEntity : BaseEntity
    {
        public string SubjectName { get; set; }
        public string Title { get; set; }
        public List<AnswerEntity> AnswerList {get;set;}
    }
}