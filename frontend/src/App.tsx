import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Guest from "./pages/Guest/Guest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guest" element={<Guest />} />
      </Routes>
    </>
  );
}

export default App;
