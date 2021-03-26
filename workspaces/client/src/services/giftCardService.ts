import axios from 'axios';

import Client from 'agcod';

const REGION = 'NA';

const CURRENCY = 'USD';

const config = {
  endpoint: {
    NA: {
      host: 'agcod-v2-gamma.amazon.com',
      region: 'us-east-1',
      countries: ['US', 'CA'],
    },
  },
  partnerId: 'Fu863',
  credentials: {
    accessKeyId: 'AKIAWWFS6UKLOKZ7UTLW',
    secretAccessKey: '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',
  },
};

const client = new Client(config);

export const createGiftCard = () => {
  client.createGiftCard('NA', 123, 'USD', (error, result) => {
    console.log('client.createGiftCard response', error, result);
  });
};

export const validateGiftCard = () => {};
