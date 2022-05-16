import React from 'react';
import { format as formatUrl } from 'url';

interface Props {
  code?: string;
}

const CLIENT_ID = 'EkPUaofVnDLBpDUKVM6KGYz3vZ_Kd1PwFgWxMtS6gjOMUAxnmid24OxHGrvl2DzR';

const XSRF_TOKEN = 'XSRF-TOKEN-FUKU-MERGE';
const loginUrl = formatUrl({
  protocol: 'https',
  host: 'patreon.com',
  pathname: '/oauth2/authorize',
  query: {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: window.location.origin,
    state: XSRF_TOKEN,
  },
});

export const PatreonTestScreen = (props: Props) => (
  <div>
    test with code {props.code}
    <a href={loginUrl}>Login with Patreon</a>
    <div>
      <input type="text" value={props.code} />
    </div>
  </div>
);

export default PatreonTestScreen;
