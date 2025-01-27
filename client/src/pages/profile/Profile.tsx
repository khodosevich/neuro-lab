import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((state: any) => state.user);

	return (
		<div>
			{
				user.user
			}
		</div>
	);
};

export default Profile;