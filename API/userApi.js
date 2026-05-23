import { BaseAPI } from './apiBase.js';

export class UserAPI extends BaseAPI {

  async createUser(userData) {

    const response = await this.context.post('users', {
      data: userData
    });

    return response;
  }

  async getUser(userId) {

    const response = await this.context.get(`users/${userId}`);

    return response;
  }

  async updateUser(userId, updatedData) {

    const response = await this.context.put(`users/${userId}`, {
      data: updatedData
    });

    return response;
  }
}