using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Entities;

namespace Api.Domain.Interfaces{
    
    public interface IRepository<T> where T:BaseEntity{
        Task<T> InsertAsync (T item);
        Task<T> UpdateAsync(T item);
        Task<bool> DeleteAsync(Guid id);
        Task<T> SelectAsync (Guid id, params Expression<Func<T, object>>[]? includes);
        Task<bool> ExistAsync (Guid id);
        Task<IEnumerable<T>> SelectAsync(SelectQuery<T>? options); 
    }
}