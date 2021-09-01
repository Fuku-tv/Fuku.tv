import axios from 'axios';
import type { PatreonResponse } from './types';

// temp for dummy account. does not have access to real patrons
const CREATOR_ACCESS_TOKEN = 'dVvAtjpfpdbzz-Bc167rgt0n1r65WKTEBNCuJRlAzy8';

const client = axios.create({
  baseURL: 'https://www.patreon.com/api/oauth2/v2',
  headers: {
    Authorization: `Bearer ${CREATOR_ACCESS_TOKEN}`,
  },
});

const patreonClient = {
  async get<T>(url: string): Promise<PatreonResponse<T>> {
    const response = await client.get<PatreonResponse<T>>(url);
    const { data, status, statusText } = response;

    if (status < 200 && status >= 300) {
      throw Error(`Failed to post data, ${status} ${statusText}`);
    }
    return data;
  },

  async post<T>(url: string, body: any): Promise<T> {
    const response = await client.post<PatreonResponse<T>>(url, body);
    const {
      data: { data },
      status,
      statusText,
    } = response;

    if (status < 200 && status >= 300) {
      throw Error(`Failed to post data, ${status} ${statusText}`);
    }

    return data;
  },
};

export default patreonClient;
