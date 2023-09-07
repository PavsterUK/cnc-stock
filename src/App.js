import { useState } from "react";
import SignIn from "./components/User/SignIn";
import Dashboard from "./components/Dashboard";
import { CategoriesProvider } from "./components/Categories/CategoriesContext";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState("");

  return (
    <>
      {!isLoggedIn && <SignIn setIsLoggedIn={setIsLoggedIn} setAuthenticatedUser={setAuthenticatedUser} />}

      <CategoriesProvider>
        {isLoggedIn && <Dashboard setIsLoggedIn={setIsLoggedIn} authenticatedUser={authenticatedUser} />}
      </CategoriesProvider>
    </>
  );
}

export default App;
