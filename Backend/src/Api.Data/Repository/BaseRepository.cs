using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Api.Data.Context;
using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Repository
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly MyContext _context;
        private DbSet<T> _dataset;
        public BaseRepository(MyContext context)
        {
            _context = context;
            _dataset = _context.Set<T>();
        }
        public async Task<bool> DeleteAsync(Guid id)
        {
            try{

                var result = await _dataset.SingleOrDefaultAsync(p => p.Id.Equals(id));

                if(result == null){
                    return false;
                }

                _dataset.Remove(result);
                
                await _context.SaveChangesAsync();
                return true;

            }catch(Exception ex){
                throw ex;
            }
        }

        public async Task<T> InsertAsync(T item)
        {
            try{
                if(item.Id == Guid.Empty){
                    item.Id = Guid.NewGuid();
                }

                item.CreateAt = DateTime.UtcNow;
                _dataset.Add(item);

                await _context.SaveChangesAsync();

            }catch(Exception ex){
                throw ex;
            }

            return item;
        }

        public async Task<bool> ExistAsync (Guid id){
            return await _dataset.AnyAsync(p => p.Id.Equals(id));
        }

        public async Task<T> SelectAsync(Guid id, params Expression<Func<T, object>>[]? includes)
        {
            IQueryable<T> query = _dataset;

            if (includes != null && includes.Any())
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            try{
                return await query.SingleOrDefaultAsync(p => p.Id.Equals(id));
            }catch(Exception ex){
                throw ex;
            }
        }
        
        public async Task<IEnumerable<T>> SelectAsync(SelectQuery<T>? options)
        {
            IQueryable<T> query = _dataset;

            if(options != null) {
                if (options.Includes != null && options.Includes.Any())
                {
                    foreach (var include in options.Includes)
                    {
                        query = query.Include(include);
                    }
                }

                if (options.Conditions != null && options.Conditions.Any())
                {
                    foreach (var condition in options.Conditions)
                    {
                        query = query.Where(condition);
                    }
                }
            }

            try{
                return await query.ToListAsync();       
            }catch(Exception ex){
                throw ex;
            }
        }

        public async Task<T> UpdateAsync(T item)
        {
            try{
                var result = await _dataset.SingleOrDefaultAsync(p => p.Id.Equals(item.Id));

                if(result == null){
                    return null;
                }

                item.UpdateAt = DateTime.UtcNow;
                item.CreateAt = result.CreateAt;

                _context.Entry(result).CurrentValues.SetValues(item);

                await _context.SaveChangesAsync();

            }catch(Exception ex){
                throw ex;
            }

            return item;
        }
    }
}