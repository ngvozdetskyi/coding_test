export const createIncomingData = {
  title: 'test99',
  price: 1221321,
  tags: ['1212dsds'],
  releaseDate: '2020-10-16',
  publisher: {
    name: 'Alex3333',
    phone: '21999999',
    siret: 212121,
  },
};
export const gameReturningData = {
  id: '1',
  title: 'test99',
  price: 1221321,
  tags: ['1212dsds'],
  releaseDate: '2020-10-16',
};
export const publisherReturningData = {
  id: '1',
  name: 'Alex3333',
  phone: '21999999',
  siret: 212121,
};
export const returningData = {
  publisher: publisherReturningData,
  ...gameReturningData,
};
