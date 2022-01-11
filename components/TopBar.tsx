import styled from 'styled-components';
import { Button, Stack, Typography } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { goToLogin, logout } from 'lib/authUtils';
import Link from 'next/link';
import useMe from 'hooks/me/useMe';

const TopBarContainer = styled(Stack)`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
`;

const TopBar = () => {
  const { data: me } = useMe();
  const { user } = useUser();
  return (
    <TopBarContainer direction="row">
      <Stack direction="row">
        <Link href={`/`} passHref>
          <Button style={{ width: 'fit-content' }}>Home</Button>
        </Link>
      </Stack>
      {!user && (
        <Button style={{ width: 'fit-content' }} onClick={() => goToLogin()}>
          Login
        </Button>
      )}
      {user && (
        <Stack direction="row">
          <Link href={`/user/${me?.id}`} passHref>
            <Button style={{ width: 'fit-content' }}>My profile</Button>
          </Link>
          <Button style={{ width: 'fit-content' }} onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      )}
    </TopBarContainer>
  );
};

export default TopBar;
