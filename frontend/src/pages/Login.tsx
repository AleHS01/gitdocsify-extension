import { Box, Button, Heading } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { useUser } from "../context/UserContext";

function Login() {
  const { signIn } = useUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "canvas.default",
        padding: 3,
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
        <Button type="submit" variant="primary" onClick={signIn} block>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
