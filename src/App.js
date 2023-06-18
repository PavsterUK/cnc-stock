import { useState } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn && <SignIn setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <Dashboard setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;
