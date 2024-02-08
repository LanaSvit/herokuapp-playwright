import { test, expect } from "@playwright/test";
import { listUsers, singleUser } from "./expectedData";

test("should get users", async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users`);
  const data = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(data.data).toEqual(expect.arrayContaining(listUsers));
});

test("should get user with id: 2", async ({ request }) => {
  const response = await request.get(`https://reqres.in/api/users/2`);
  const data = await response.json();
  expect(response.ok()).toBeTruthy();
  console.log(data.data);
  expect(data.data).toEqual(expect.objectContaining(singleUser));
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

test("should delete user", async ({ request }) => {
  const response = await request.delete(`https://reqres.in/api/user/6`, {});
  expect(response.ok()).toBeTruthy();
});

test("should create user", async ({ request }) => {
  const newUserData = {
    name: "morpheus",
    job: "leader",
  };

  const response = await request.post(`https://reqres.in/api/users`, {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(newUserData),
  });
  expect(response.ok()).toBeTruthy();
});
