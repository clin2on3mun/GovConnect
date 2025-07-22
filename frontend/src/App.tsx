import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/SignUp";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Guest/Submission";
import AllSubmission from "./pages/Guest/AllSubmission";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="submissions" element={<AllSubmission />} />
          <Route path="submission/:id" element={<Submission/>}/>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
