/* eslint-disable camelcase */

export interface PatreonResponse<T> {
  data: T;
  included?: PatreonMember[];
  meta?: any;
  links?: {
    self: string;
  };
}

export interface PatreonIdentity {
  id: string;
  attributes: {
    email: string;
    full_name: string;
  };
}

export interface PatreonCampaign {
  id: string;
  attributes: {
    pledge_url: string;
    creation_name: string;
    patron_count: number;
  };
}

export interface PatreonMember {
  id: string;
  attributes: {
    email: string;
    full_name: string;
  };
  relationships?: any;
}
