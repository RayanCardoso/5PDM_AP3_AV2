using AutoMapper;
using Api.Domain.Dto;
using Api.Domain.Entities;

namespace Demand.Domain.Profiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile() {
            CreateMap<QuestionEntity, QuestionDto>().ReverseMap();
            CreateMap<QuestionEntity, QuestionUpdateDto>().ReverseMap();
        }
    }
}