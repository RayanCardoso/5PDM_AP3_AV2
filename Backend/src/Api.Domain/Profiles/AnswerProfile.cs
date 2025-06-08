using AutoMapper;
using Api.Domain.Dto;
using Api.Domain.Entities;

namespace Demand.Domain.Profiles
{
    public class AnswerProfile : Profile
    {
        public AnswerProfile() {
            CreateMap<AnswerEntity, AnswerDto>().ReverseMap();
            CreateMap<AnswerEntity, AnswerUpdateDto>().ReverseMap();
        }
    }
}