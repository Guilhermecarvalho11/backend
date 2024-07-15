const UserCreateServices = require("./userCreateService");
const UserCreateServicesInMemory = require("../repositories/UserRepositoryInMemory");

it("user should be create", async () => {
  const user = {
    name: "User test",
    email: "user@test.com",
    password: "123",
  };

  const userRepositoryInMemory = new UserCreateServicesInMemory();
  const userCreateService = new UserCreateServices(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  console.log(userCreated);

  expect(userCreated).toHaveProperty("id");
});
