import ProfileDetailPage from './ProfileDetailPage';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const ProfilePage = () => {
  return (
    <>
    <PrimaryAppBar selectedID={2} />
    <ProfileDetailPage />
    </>
  );
};

export default ProfilePage;
