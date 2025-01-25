import React from "react";
import { useUser } from "./context/UserContext";

function App() {
  const { user, loading, signIn, signOut } = useUser();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!user ? (
        <button onClick={signIn}>Sign in with GitHub</button>
      ) : (
        <>
          <p>Welcome, {user.user_name}</p>
          <p>Welcome, {user.full_name}</p>
          <p>Welcome, {user.email}</p>
          <p>Welcome, {user.id}</p>
          <img src={user.avatar_url} />
          <button onClick={signOut}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
