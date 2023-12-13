import { test, expect } from "@playwright/test";

test("should get users", async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users`);
  expect(response.ok()).toBeTruthy();
});

test("should get user with id: 2", async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users/2`);
  expect(response.ok()).toBeTruthy();
});

test("should log in", async ({ request }) => {
  const response = await request.post(`https://reqres.in/api/login`, {
    data: {
      email: "george.bluth@reqres.in",
      password: "testPass",
    },
  });
  expect(response.ok()).toBeTruthy();
});
