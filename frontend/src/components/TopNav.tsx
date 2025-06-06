import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/AuthHooks";
import { useState } from "react";

export default function TopNav() {
  const [state, setState] = useState<boolean>(false)
  const{user} = useAuth();
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
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  const navs = [
    {
   
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/submissions",
      name: "Submissions",
    },
  ];
  
  
  return (
    <>
      <header className="py-4  grid gap-5">
        <div className="grid grid-cols-2  items-center">
          <h1 className="text-2xl">GovConnect</h1>
          <div className="relative flex flex-col">
            <button  className="bg-green-300 self-end px-4 z-10 py-2 text-center rounded-3xl hover:cursor-pointer leading-[1.5rem]" onClick={()=> setState(!state)}>
            {user?.name.split(' ').map(name=> name[0]).join('')}
          </button>
          <PopUp user={user?.name} state={state} handleLogout={handleLogout}/>
          </div>
          
        </div>
        <nav>
          <ul className="flex">
            {navs.map((el, index) => (
            
                <li className={`${index}`} key={index+1}>
                  <NavLink
                    to={el.path}
                    className={`inline-block py-1 px-4 text-lg`}
                  >
                    {el.name}
                  </NavLink>
                </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

const PopUp = ({state,user, handleLogout}:{state:boolean,user:string|undefined, handleLogout:()=>void}) =>{
  return (
    <ul className={`${state? 'opacity-[1] z-10 top-11 transition-[opacity] ease-in-out ':'opacity-0'} absolute  left-[20%] sm:left-[50%] min-[480px]:left-[35%] max-[] md:left-[63%] lg:left-[72%] xl:left-[76%]  bg-white shadow-md rounded-md`}>
      <li className="px-4 py-2 text-sm">{user}</li>
      <li className="group">
        <button className="flex items-center w-full group-hover:bg-black hover:rounded-md px-4 py-2 gap-4"  onClick={handleLogout}>
            <LogOut className="group-hover:text-white" /> <span className="group-hover:text-white">logout</span>
          </button>
      </li>
    </ul>
     
  )
}