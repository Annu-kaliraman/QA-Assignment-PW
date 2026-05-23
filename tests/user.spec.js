import { test, expect } from '@playwright/test';

import { UserAPI } from '../API/userApi.js';

import data from '../test_data/data.json' assert { type: 'json' };

test.describe('User API Automation', () => {

  let userAPI;
  let userID;

  test.beforeEach(async () => {

    userAPI = new UserAPI();

    await userAPI.init();
  });

  test('Create a user, validate status code and fetch and store the id', async () => {

    const createResponse = await userAPI.createUser(data.createUser);

    expect(createResponse.status()).toBe(201);

    const responseBody = await createResponse.json()
    console.log(responseBody);

    userID = responseBody.id;
    console.log(userID);

  });

  test('Get the created user and validate the response', async () => {
    const user = await userAPI.getUser(data.userid);

    await expect(user.status()).toBe(200);

    const response = await user.json();

    await expect(response.data.id).toBe(data.userid);
    await expect(response.data.first_name).toBe('Janet');
  });

  test('Update user name, and validate the same', async () => {
    const updated_user = await userAPI.updateUser(userID, {
      "name": "Annu Updated",
      "job": "Senior QA Engineer"
    });

    await expect(updated_user.status()).toBe(200);

    const response = await updated_user.json();

    await expect(response.name).toBe(data.updatedUser.name);
    await expect(response.job).toBe(data.updatedUser.job);
  });

});