import styled from "styled-components";
import { Button, Stack, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { goToLogin, logout } from "lib/authUtils";

const TopBarContainer = styled(Stack)`
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const TopBar = () => {
  const { user } = useUser();
  return (
    <TopBarContainer>
      {!user && (
        <Button style={{ width: "fit-content" }} onClick={() => goToLogin()}>
          Login
        </Button>
      )}
      {user && (
        <>
          <Button style={{ width: "fit-content" }} onClick={() => logout()}>
            Logout
          </Button>
          <Typography>{user.name}</Typography>
        </>
      )}
    </TopBarContainer>
  );
};

export default TopBar;
