import { Icon } from '@chakra-ui/react';
import * as React from 'react';

import { FaFacebookF, FaTwitter, FaDiscord, FaEnvelope } from 'react-icons/fa';

import './SocialMedia.scss';

interface Props {
  closeDrawer?: () => void;
  show?: boolean;
}
const SocialMedia: React.FC = (props) => (
  <div className="social-media-container">
    {/* <SocialMediaItem icon={FaFacebookF} ariaLabel="facebook" url="https://www.facebook.com/groups/730049864549612" /> */}
    <SocialMediaItem icon={FaDiscord} ariaLabel="discord" url="https://discord.com/channels/785224675135455242/785224675135455245" />
    {/* <SocialMediaItem icon={FaTwitter} ariaLabel="twitter" url="https://twitter.com/FukuTVGame" /> */}
    <SocialMediaItem icon={FaEnvelope} ariaLabel="email" url="mailto:support@fuku.tv" />
    <div />
  </div>
);

export default SocialMedia;

const SocialMediaItem = (props) => (
  <div className="social-media-item">
    <a className="social-icon-link" href={props.url} target="_blank" aria-label={props.ariaLabel} rel="noreferrer">
      <Icon as={props.icon} />
    </a>
  </div>
);
