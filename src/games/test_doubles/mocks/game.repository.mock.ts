import {
  gameReturningData,
  returningData,
} from '../stubs/game.service.create.stub';

export const getGameRepositoryMock = () => ({
  save: jest.fn().mockImplementation((data) => ({ id: '1', ...data })),
  find: jest.fn().mockImplementation(() => [gameReturningData]),
  findOne: jest.fn().mockImplementation(() => returningData),
  update: jest.fn().mockImplementation(() => ({})),
});
