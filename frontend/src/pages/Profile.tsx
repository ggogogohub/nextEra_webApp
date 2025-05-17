import styled from 'styled-components';
import ProfileForm from '../components/profile/ProfileForm';

// Styled components
const ProfileContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      <ProfileForm />
    </ProfileContainer>
  );
};

export default Profile;
