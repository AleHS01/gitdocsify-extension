import { useUser } from "../context/UserContext";
import { Button, Text, Box } from "@primer/react";
import axiosInstance from "../utils/axios";

const Dashboard = () => {
  const { user, signOut } = useUser();
  const protectedRoute = async () => {
    try {
      const { data } = await axiosInstance.get(
        "http://localhost:8000/api/protected-route"
      );

      console.log("Response:\n", data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

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
      <Button onClick={protectedRoute}>Fetch Payload</Button>
    </Box>
  );
};

export default Dashboard;
