import { useState } from "react";
import SignIn from "./components/User/SignIn";
import Dashboard from "./components/Dashboard";
import { CategoryProvider } from "./components/Categories/CategoryContext";
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
      <CategoryProvider>
        {isLoggedIn && (
          <Dashboard
            setIsLoggedIn={setIsLoggedIn}
            authenticatedUser={authenticatedUser}
          />
        )}
      </CategoryProvider>
    </>
  );
}

export default App;
