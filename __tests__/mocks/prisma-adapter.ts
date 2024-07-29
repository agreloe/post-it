const PrismaAdapter = jest.fn().mockReturnValue({
    createUser: jest.fn(),
    getUser: jest.fn()
  });

export { PrismaAdapter };