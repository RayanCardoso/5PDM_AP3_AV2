using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using AutoMapper;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Services;
using System.Linq.Expressions;

namespace Api.Service.Services
{
    public class QuestionService : IQuestionService
    {

        private IRepository<QuestionEntity> _repository;
        private IRepository<AnswerEntity> _answerRepository;
        private readonly IMapper _mapper;

        public QuestionService(
            IRepository<QuestionEntity> repository, 
            IRepository<AnswerEntity> answerRepository,
            IMapper mapper
        )
        {
            _repository = repository;
            _answerRepository = answerRepository;
            _mapper = mapper;
        }
        
        public async Task<bool> Delete(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<QuestionEntity> Get(Guid id)
        {
            return await _repository.SelectAsync(id, x => x.AnswerList);
        }

        public async Task<List<AnswerDto>> GetCorrectAnswer(Guid questionId) {
            QuestionEntity questionEntity = await Get(questionId);
            List<AnswerEntity> answerEntity = questionEntity.AnswerList.Where(al => al.IsCorrect).ToList();
            List<AnswerDto> answerDto = _mapper.Map<List<AnswerDto>>(answerEntity);

            return answerDto;
        }
        public async Task<List<QuestionEntity>> GetBySubject(string subject) {
            IEnumerable<QuestionEntity> arrayQuestionsEntity = await _repository.SelectAsync(new SelectQuery<QuestionEntity>
            {
                Includes = new Expression<Func<QuestionEntity, object>>[]
                {
                    q => q.AnswerList
                },
                Conditions = new Expression<Func<QuestionEntity, bool>>[]
                {
                    q => q.SubjectName == subject
                }
            });

            return arrayQuestionsEntity
                .OrderBy(q => Guid.NewGuid())
                .Take(10)
                .ToList();
        }

        public async Task<IEnumerable<QuestionEntity>> GetAll()
        {
            return await _repository.SelectAsync(new SelectQuery<QuestionEntity>
            {
                Includes = new Expression<Func<QuestionEntity, object>>[]
                {
                    q => q.AnswerList
                }
            });
            // x => x.AnswerList);
        }

        public async Task<QuestionDto> Post(QuestionDto question)
        {
            var entity = _mapper.Map<QuestionEntity>(question); 
            var result =  await _repository.InsertAsync(entity);
            var questionDto = _mapper.Map<QuestionDto>(result);

            foreach(var answer in question.Answers) {
                answer.QuestionId = result.Id;

                var answerEntity = _mapper.Map<AnswerEntity>(answer);
                var resultAnswer =  await _answerRepository.InsertAsync(answerEntity);
                var answerDto =  _mapper.Map<AnswerDto>(resultAnswer);


                questionDto.Answers.Add(answerDto);
            }

            return questionDto;
        }

        public async Task<QuestionDto> Put(QuestionUpdateDto question)
        {
            QuestionEntity lastQuestion = await Get(question.Id);

            // Deletando respostas anteriores
            var answersToDelete = lastQuestion.AnswerList.ToList();

            foreach (var lastAnswer in answersToDelete) {
                await _answerRepository.DeleteAsync(lastAnswer.Id);
            }

            var entity = _mapper.Map<QuestionEntity>(question); 
            var result =  await _repository.UpdateAsync(entity);
            var questionDto = _mapper.Map<QuestionDto>(result);

            foreach(var answer in question.Answers) {
                var answerEntity = _mapper.Map<AnswerEntity>(answer);

                answerEntity.QuestionId = result.Id;

                var resultAnswer =  await _answerRepository.InsertAsync(answerEntity);
                var answerDto =  _mapper.Map<AnswerDto>(resultAnswer);

                questionDto.Answers.Add(answerDto);
            }

            return questionDto;
        }
    }
}