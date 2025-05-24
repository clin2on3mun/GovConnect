// Inside any component
import axios from "axios";
import { useAuth } from "../hooks/AuthHooks";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const { user, isAuthenticated, setUser, isLoading } = useAuth();
  console.log(isLoading);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null); // clear user from context
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome back, {user?.email}!</p>
          <Button label="Logout" onClick={handleLogout} />
        </>
      ) : (
        <p>Please log in or sign up.</p>
      )}
    </div>
  );
};

export default Dashboard;
