import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/AuthHooks";
import { useState, useRef, useEffect } from "react";

export default function TopNav() {
  const [state, setState] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

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
    { path: "/dashboard", name: "Dashboard" },
    { path: "/submissions", name: "Submissions" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (state && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setState(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state]);

  return (
    <header className="py-6 grid gap-5">
      <div className="grid grid-cols-2 items-center">
        <h1 className="text-2xl">GovConnect</h1>
        <div className="relative py-3 flex flex-col" ref={menuRef}>
          <button
            className="bg-lime-200 self-end w-9  z-10 h-9 text-sm text-gray-600 text-center rounded-full hover:cursor-pointer leading-[1.5rem]"
            onClick={() => setState(!state)}
          >
            {user?.name.split(" ").map((n) => n[0]).join("")}
          </button>
          <PopUp user={user?.name} state={state} handleLogout={handleLogout} />
        </div>
      </div>

      <nav>
        <ul className="flex">
          {navs.map((el, index) => (
            <li className={`${index}`} key={index + 1}>
              <NavLink to={el.path} className="inline-block py-1 px-4 text-lg">
                {el.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const PopUp = ({
  state,
  user,
  handleLogout,
}: {
  state: boolean;
  user: string | undefined;
  handleLogout: () => void;
}) => {
  return (
    <ul
      className={`${
        state ? "opacity-100 z-10 top-[3.2rem] transition-opacity" : "opacity-0 pointer-events-none"
      } absolute left-[20%] border border-gray-300 sm:left-[50%] min-[480px]:left-[35%] md:left-[63%] lg:left-[72%] xl:left-[76%] shadow-lg  bg-white  rounded-md`}
    >
      <li className="px-4 py-2 text-sm">{user}</li>
      <li className="group">
        <button
          className="flex items-center w-full group-hover:bg-gray-100 hover:rounded-md px-4 py-2 gap-4"
          onClick={handleLogout}
        >
          <LogOut className="group-hover:text-black" />
          <span className="group-hover:text-black">logout</span>
        </button>
      </li>
    </ul>
  );
};
