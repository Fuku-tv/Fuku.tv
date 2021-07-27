import axios from 'axios';
import { env } from 'fuku.tv-shared';

const FukuAPI = axios.create({
  baseURL: env.fukuApiServerURL(),
});

export const getLeaderboard = async () => {
  const result = await FukuAPI.get('/leaderboard');

  return result.data;
};

export default {};
