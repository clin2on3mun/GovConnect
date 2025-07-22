import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/AuthHooks";


const Dashboard = () => {
  const { user, isLoading } = useAuth();

 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    <div>
      <p>Welcome back, {user?.name}!</p>
    </div>
  );
};

export default Dashboard;
