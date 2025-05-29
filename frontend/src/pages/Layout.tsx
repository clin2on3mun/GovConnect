import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function Layout() {
  return (
    <>
      <main className="max-w-7xl px-4 mx-auto">
        <TopNav />
        <Outlet />
      </main>
    </>
  );
}
