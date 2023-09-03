import { useState } from "react";
import SignIn from "./components/User/SignIn";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState("");

  return (
    <>
      {!isLoggedIn && (
        <SignIn
          setIsLoggedIn={setIsLoggedIn}
          setAuthenticatedUser={setAuthenticatedUser}
        />
      )}

      {isLoggedIn && (
        <Dashboard
          setIsLoggedIn={setIsLoggedIn}
          authenticatedUser={authenticatedUser}
        />
      )}
    </>
  );
}

export default App;
