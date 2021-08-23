import type { AxiosResponse } from 'axios';
import axios from 'axios';
import * as pateronMethods from './index';
import type { PatreonResponse, PatreonIdentity } from './types';

const mockedAxios = axios as jest.Mocked<typeof axios>;

// uncomment below to test the actual Patreon API
// jest.unmock('axios');
describe('Patreon basics', () => {
  it('should have created an axios instance', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://www.patreon.com/api/oauth2/v2',
      })
    );
  });
});

describe('Patreon methods', () => {
  beforeAll(async () => {
    const mockedResponse: AxiosResponse<PatreonResponse<PatreonIdentity>> = {
      data: {
        data: {
          id: '123',
          attributes: {
            email: 'testuser@mock.com',
            full_name: 'Test',
          },
        },
        included: [
          {
            id: '12345',
            attributes: {
              email: 'member1@mock.com',
              full_name: 'John Wayne',
            },
          },
          {
            id: '42069',
            attributes: {
              email: 'member2@mock.com',
              full_name: 'Alex Rose',
            },
          },
        ],
        links: {
          self: 'https://www.patreon.com/api/oauth2/v2/user/12345',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);
  });
  it('should get current user', async () => {
    const result = await pateronMethods.getCurrentUser();
    expect(result.data.attributes.email).toEqual('testuser@mock.com');
  });
  it('should get current user members', async () => {
    const result = await pateronMethods.getCurrentUser();
    expect(result.included[0].attributes.full_name).toEqual('John Wayne');
    expect(result.included[1].attributes.full_name).toEqual('Alex Rose');
  });
});
