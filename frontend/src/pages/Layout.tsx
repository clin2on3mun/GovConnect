import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useAuth } from "../hooks/AuthHooks";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Layout() {
  const {user,isLoading} = useAuth();
  const navigate =  useNavigate()
  useEffect(()=>{
    if(!user && !isLoading){
    navigate('/login')
  }
  },[user, isLoading])
  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }
  
  return (
    <>
    <main className="max-w-7xl  px-4 mx-auto">
        <TopNav />
        <Outlet />
      </main>
    </>
  );
}
