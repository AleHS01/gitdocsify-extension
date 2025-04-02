import { useUser } from "../context/UserContext";
import { Box, Avatar, Text, Stack, Link } from "@primer/react";

const DashboardHeader = () => {
  const { user } = useUser();

  return (
    <Box
      as="header"
      sx={{
        width: "100%",
        p: 3,
        borderBottom: "1px solid",
        borderColor: "border.default",
        backgroundColor: "canvas.default",
      }}
    >
      <Stack gap="normal" direction="horizontal">
        <Avatar src={user?.avatar_url || ""} size={32} alt={user?.full_name} />
        <Link
          href={`https://github.com/${user?.user_name}`}
          target="_blank"
          style={{
            color: "inherit",
          }}
        >
          <Text sx={{ fontWeight: "bold" }}>{user?.user_name}</Text>
        </Link>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
