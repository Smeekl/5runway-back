import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const mockedUser = {
  id: 13,
  createdAt: '2022-06-29T13:05:55.770Z',
  updatedAt: '2022-06-29T13:05:55.770Z',
  deletedAt: null,
  email: 'aboba@gmail.com',
  phoneNumber: null,
};

export const mockedUserWithPassword = {
  id: 13,
  createdAt: '2022-06-29T13:05:55.770Z',
  updatedAt: '2022-06-29T13:05:55.770Z',
  deletedAt: null,
  email: 'aboba@gmail.com',
  phoneNumber: null,
  password: '$2b$10$I4ZE3s/NFJbHYuk9N7VYq.MiICjn9egmY8FeeR3yH6TteGaflAEE2',
};

export const mockedQueryUser = {
  select: () => mockedQueryUser,
  addSelect: () => mockedQueryUser,
  groupBy: () => mockedQueryUser,
  where: () => mockedQueryUser,
  getOne: () => mockedUser,
};
export const mockedQueryUserWithPassword = {
  select: () => mockedQueryUserWithPassword,
  addSelect: () => mockedQueryUserWithPassword,
  groupBy: () => mockedQueryUserWithPassword,
  where: () => mockedQueryUserWithPassword,
  getOne: () => mockedUserWithPassword,
};
export const mockedQueryNoUser = {
  select: () => mockedQueryNoUser,
  addSelect: () => mockedQueryNoUser,
  groupBy: () => mockedQueryNoUser,
  where: () => mockedQueryNoUser,
  getOne: () => undefined,
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      addSelect: () => createQueryBuilder,
      groupBy: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getOne: () => undefined,
    };

    return {
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(() => createQueryBuilder),
    };
  },
);
