// Disabled camelCase rule because patreon API returns snake-case :(
import type { PatreonIdentity, PatreonMember } from './types';
import patreonClient from './client';

export async function getCurrentUser() {
  return patreonClient.get<PatreonIdentity>('/identity?include=memberships&fields%5Buser%5D=about,email');
}

export async function getCampaignMembers(campaignId: string) {
  return patreonClient.get<PatreonIdentity[]>(`/campaigns/${campaignId}/members`);
}

export async function getMember(memberId: string) {
  const response = await patreonClient.get<PatreonMember>(`/members/${memberId}`);
}
export async function getMemberByEmail(email: string) {
  const response = await patreonClient.get<PatreonIdentity>('/identity?include=memberships&fields%5Buser%5D=about,email');
}
