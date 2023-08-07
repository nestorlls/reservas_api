class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    if (!id) {
      throw new Error({ status: 400, message: 'Id is required' });
    }
    return await this.repository.update(id, entity);
  }

  async delete(id) {
    if (!id) {
      throw new Error({ status: 400, message: 'Id is required' });
    }
    return await this.repository.delete(id);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }
}

module.exports = BaseService;
