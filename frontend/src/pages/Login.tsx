import { Box, Button, Heading } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { useUser } from "../context/UserContext";
import React from "react";

function Login() {
  const { signIn, loading } = useUser();
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <MarkGithubIcon size={48} />

      <Heading as="h1" sx={{ fontSize: 4, fontWeight: "bold", mt: 3 }}>
        Sign in with GitHub
      </Heading>

      <Box
        as="form"
        sx={{
          width: "100%",
          maxWidth: "400px",
          mt: 4,
          padding: 3,
          backgroundColor: "canvas.inset",
          borderRadius: 2,
          boxShadow: "shadow.medium",
        }}
      >
        <Button
          type="submit"
          variant="primary"
          onClick={handleSignIn}
          loading={loading}
          block
        >
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
