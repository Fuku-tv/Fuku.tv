// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const axios: jest.Mocked<typeof import('axios').default> = jest.createMockFromModule('axios');

axios.create.mockReturnThis();

export default axios;
