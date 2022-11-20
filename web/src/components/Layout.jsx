import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useLocalStorage from "../hooks/useLocalStorage";

const Layout = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'forest');
  const darkMode = theme === 'forest';
  const nextTheme = darkMode ? 'garden' : 'forest'

  return (
    <div className="h-screen" data-theme={theme}>
      <div className="flex flex-col md:flex-row">
        <Navbar darkMode={darkMode} onModeClick={() => setTheme(nextTheme)} />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
