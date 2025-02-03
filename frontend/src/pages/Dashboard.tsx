import React from "react";
import { useUser } from "../context/UserContext";
import { Button, Text, Box } from "@primer/react";

const Dashboard = () => {
  const { user, signOut } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Text>{user?.user_name}</Text>
      <Button onClick={signOut}>Sign Out</Button>
    </Box>
  );
};

export default Dashboard;
