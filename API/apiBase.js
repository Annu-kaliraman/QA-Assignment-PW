import { request } from '@playwright/test';

export class BaseAPI {

  constructor() {

    this.baseURL = process.env.API_BASE_URL;
    this.context = null;
  }

  async init() {

    this.context = await request.newContext({

      baseURL: this.baseURL,

      extraHTTPHeaders: {

        'Content-Type': 'application/json',

        'x-api-key':
          'free_user_3DC7eayigrz9CCIVfQfmN2L9VjO'
      }
    });
  }
}