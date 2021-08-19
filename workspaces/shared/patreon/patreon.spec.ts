import type { AxiosResponse } from 'axios';
import axios from 'axios';
import * as pateronMethods from './index';
import type { PatreonResponse, PatreonIdentity } from './index';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Patreon', () => {
  it('should have created an axios instance', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://www.patreon.com/api/oauth2/v2',
      })
    );
  });

  it('should get current user', async () => {
    const mockedResponse: AxiosResponse<PatreonResponse<PatreonIdentity>> = {
      data: {
        data: {
          attributes: {
            email: 'testuser@mock.com',
            full_name: 'Test',
          },
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);
    const data = await pateronMethods.getCurrentUser();
    expect(data.attributes.email).toEqual('testuser@mock.com');
  });
});
