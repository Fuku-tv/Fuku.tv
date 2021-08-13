import * as React from 'react';
import moduleStyles from './ProfileImage.scss';

interface Props {
  image?: string;
  size?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  borderRadius?: string | number;
}

const UserProfile: React.FC<Props> = (props) => {
  const styles = {
    width: props.size,
    height: props.size,
    marginLeft: props.marginleft,
    marginRight: props.marginright,
    marginTop: props.margintop,
    marginBottom: props.marginbottom,
    borderRadius: props.borderradius,
  };

  // const placeholderImage = 'https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg';
  const placeholderImage = profile;
  const profileImg = <img src={props.image} alt="" />;
  return (
    <div style={styles} id="profile-image">
      {props.image ? profileImg : placeholderImage}
    </div>
  );
};

export default UserProfile;

const profile = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="user-alt"
    className="svg-inline--fa fa-user-alt fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"
    />
  </svg>
);
