using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Entities;

namespace Api.Domain.Interfaces.Services
{
    public interface IQuestionService
    {
        Task<QuestionEntity> Get(Guid id);
        Task<IEnumerable<QuestionEntity>> GetAll();
        Task<List<QuestionEntity>> GetBySubject(string subject);
        Task<List<AnswerDto>> GetCorrectAnswer(Guid questionId);
        Task<QuestionDto> Post(QuestionDto question);
        Task<QuestionDto> Put(QuestionUpdateDto question);
        Task<bool> Delete(Guid id);
    
    }
}