import { useState } from "react";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? <Dashboard /> : <AdminLogin onLogin={setIsLoggedIn} />}
    </>
  );
}

export default App;
