const UserCreateServices = require("./userCreateService");
const UserCreateServicesInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../ultils/AppError");

describe("UserCreateServices", () => {
  let userRepository = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepository = new UserCreateServicesInMemory();
    userCreateService = new UserCreateServices(userRepository);
  });

  it("user should be create", async () => {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123",
    };
    const userCreated = await userCreateService.execute(user);

    console.log(userCreated);

    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "user test 1",
      email: "user@teste.com",
      password: "123",
    };

    const user2 = {
      name: "user test 2",
      email: "user@teste.com",
      password: "456",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("este email ja está cadastrado")
    );
  });
});
