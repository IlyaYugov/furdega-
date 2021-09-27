﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Furdega.DataAccess.Models;
using Furdega.Models.Furnitures.Input;
using Furdega.Models.Furnitures.Output;
using Furdega.Repositories.RepositoryBase;

namespace Furdega.Services.FurnitureTypes
{
    public class FurnitureTypeService: IFurnitureTypeService
    {
        private readonly IRepositoryBase<FurnitureType> _furnitureTypeRepository;
        private readonly IMapper _mapper;

        public FurnitureTypeService(IRepositoryBase<FurnitureType> furnitureTypeRepository, IMapper mapper)
        {
            _furnitureTypeRepository = furnitureTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FurnitureTypeResponse>> GetTypes()
        {
            var types = await _furnitureTypeRepository.GetItems();

            var response = _mapper.Map<List<FurnitureTypeResponse>>(types);

            return response;
        }

        public async Task<int> Create(UpdateFurnitureTypeRequest type)
        {
            var furnitureType = _mapper.Map<FurnitureType>(type);

            var createdType = await _furnitureTypeRepository.Create(furnitureType);

            return createdType.Id;
        }

        public async Task Update(int id, UpdateFurnitureTypeRequest type)
        {
            var furnitureType = _mapper.Map<FurnitureType>(type);
            furnitureType.Id = id;

            await _furnitureTypeRepository.Update(furnitureType);
        }

        public Task Delete(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}