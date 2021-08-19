/* eslint-disable camelcase */

// Disabled camelCase rule because patreon API returns snake-case :(
import { patreon as patreonAPI } from 'patreon';
import axios from 'axios';

// TODO remove temp any with actual response types
export interface PatreonResponse<T> {
  data: T;
}

export interface PatreonIdentity {
  attributes: {
    email: string;
    full_name: string;
  };
}

// temp for dummy account. does not have access to real patrons
const CREATOR_ACCESS_TOKEN = 'dVvAtjpfpdbzz-Bc167rgt0n1r65WKTEBNCuJRlAzy8';

const patreonAPIClient = patreonAPI(CREATOR_ACCESS_TOKEN);

const client = axios.create({
  baseURL: 'https://www.patreon.com/api/oauth2/v2',
  headers: {
    Authorization: `Bearer ${CREATOR_ACCESS_TOKEN}`,
  },
});

const patreonClient = {
  async get<T>(url: string) {
    const response = await client.get<PatreonResponse<T>>(url);
    const {
      data: { data },
      status,
    } = response;

    if (status >= 200 && status < 300) {
      throw Error('Failed to get endpoint');
    }
    return data;
  },

  async post<T>(url: string, body: any) {
    const response = await client.post<PatreonResponse<T>>(url, body);
    const {
      data: { data },
      status,
    } = response;

    if (status >= 200 && status < 300) {
      throw Error('Failed to post data');
    }

    return data;
  },
};

export async function getPateronUser() {
  const { store } = await patreonAPIClient('/current_user');
  const users = store.findAll('user').map((user) => user.serialize());
  return { user: users[0].data.attributes };
}

export async function getCurrentUser() {
  return patreonClient.get<PatreonIdentity>('/identity?include=campaign&fields%5Buser%5D=about,email');
}

export async function getCreatorCampaign() {
  const { store } = await patreonAPIClient('/current_user/campaigns');
  const campaigns = store.findAll('campaign').map((campaign) => campaign.serialize());

  return { campaigns: campaigns[0].data.attributes };
}
