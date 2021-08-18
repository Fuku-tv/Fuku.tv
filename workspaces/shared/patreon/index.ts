import { patreon as patreonAPI } from 'patreon';
import axios from 'axios';

// temp for dummy account. does not have access to real patrons
const CREATOR_ACCESS_TOKEN = 'dVvAtjpfpdbzz-Bc167rgt0n1r65WKTEBNCuJRlAzy8';

const patreonAPIClient = patreonAPI(CREATOR_ACCESS_TOKEN);

const client = axios.create({
  baseURL: 'https://www.patreon.com/api/oauth2/v2',
  headers: {
    Authorization: `Bearer ${CREATOR_ACCESS_TOKEN}`,
  },
});

export async function getPateronUser() {
  const { store } = await patreonAPIClient('/current_user');
  const users = store.findAll('user').map((user) => user.serialize());
  return { user: users[0].data.attributes };
}

export async function getCurrentUser() {
  try {
    const {
      data: { data },
    } = await client.get('/identity?include=campaign&fields%5Buser%5D=about,email');

    return { user: data };
  } catch (err) {
    console.log(err);
    return { user: {} };
  }
}

export async function getCreatorCampaign() {
  const { store } = await patreonAPIClient('/current_user/campaigns');
  const campaigns = store.findAll('campaign').map((campaign) => campaign.serialize());

  return { campaigns: campaigns[0].data.attributes };
}
