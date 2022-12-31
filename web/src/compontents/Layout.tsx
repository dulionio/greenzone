import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useLocalStorage } from "../hooks/LocalStorage";

const Layout = () => {
  const [theme] = useLocalStorage('theme', 'forest');

  return (
    <div className="h-screen" data-theme={theme}>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
