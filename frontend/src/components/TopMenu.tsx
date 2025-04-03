import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Box, IconButton } from "@primer/react";
import { SignOutIcon, SignInIcon } from "@primer/octicons-react";
import ColorModeSwitcher from "./ColorModeSwitcher";

const TopMenu = () => {
  const { signOut, signIn } = useUser();
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        position: "absolute",
        top: 0,
        right: 0,
        p: 3,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      <ColorModeSwitcher />
      {isLandingPage ? (
        <IconButton
          onClick={signIn}
          icon={SignInIcon}
          aria-label="Sign in"
          sx={{ color: "fg.default", "&:hover": { color: "success.fg" } }}
        />
      ) : (
        <IconButton
          icon={SignOutIcon}
          aria-label="Sign out"
          onClick={signOut}
          sx={{ color: "fg.default", "&:hover": { color: "danger.fg" } }}
        />
      )}
    </Box>
  );
};

export default TopMenu;
