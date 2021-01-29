import * as React from 'react';
import './ProfileImage.scss';

interface Props {
	image?: string;
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
		marginBottom: props.marginBottom
	};

	const placeholderImage = 'https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg';
	return (
		<div style={styles} id="profile-image">
			<img
				src={

						props.image ? props.image :
						placeholderImage
				}
				alt=""
			/>
		</div>
	);
};

export default UserProfile;
