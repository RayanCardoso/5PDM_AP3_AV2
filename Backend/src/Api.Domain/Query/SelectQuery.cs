using System;
using System.Linq.Expressions;

namespace Api.Domain.Dto
{
    public class SelectQuery<T>
    {
        public Expression<Func<T, object>>[]? Includes { get; set; }
        public Expression<Func<T, bool>>[]? Conditions { get; set; }
    }
}