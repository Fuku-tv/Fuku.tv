import * as React from 'react';
import './ProfileImage.scss';

interface Props {
  size?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
}

const UserProfile: React.FC<Props> = (props) => {
  const styles = {
    width: props.size,
    height: props.size,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
  };
  return (
    <div style={styles} id="profile-image">
      <img src="https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg" alt="" />
    </div>
  );
};

export default UserProfile;
