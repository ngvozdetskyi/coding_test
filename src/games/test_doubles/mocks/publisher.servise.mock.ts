export const PublisherServiceMock = {
  create: jest.fn().mockImplementation((data) => ({ id: '1', ...data })),
  update: jest.fn().mockImplementation(() => ({})),
  remove: jest.fn().mockImplementation((id) => {
    return !id ? undefined : {};
  }),
};
