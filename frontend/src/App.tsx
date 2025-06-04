import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/SignUp";
import Guest from "./pages/Guest/Submissions";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Guest/Submission";

function App() {
  console.log(Routes);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="submissions" element={<Guest />} />
          <Route path="submission/:id" element={<Submission/>}/>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
