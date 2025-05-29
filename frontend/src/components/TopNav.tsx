import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Button from "./Button";

export default function TopNav() {
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
      <header className="py-4 grid gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">GovConnect</h1>
          <Button label="logout" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
        <nav>
          <ul className="flex">
            {navs.map((el, index) => (
              <>
                <li className="" key={index}>
                  <NavLink
                    to={el.path}
                    className={`inline-block py-1 px-4 text-lg`}
                  >
                    {el.name}
                  </NavLink>
                </li>
              </>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
