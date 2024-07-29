export const getPosts = jest.fn().mockResolvedValue([
  {
    id: 1,
    title: "Test Post 1",
    body: "This is the body of the first test post.",
    reactions: {
      likes: 10,
      dislikes: 1,
    },
    userId: 1,
  },
  {
    id: 2,
    title: "Test Post 2",
    body: "This is the body of the second test post.",
    reactions: {
      likes: 20,
      dislikes: 2,
    },
    userId: 2,
  },
]);
