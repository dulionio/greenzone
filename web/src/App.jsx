import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import NoMatch from "./pages/NoMatch";
import Sensors from "./pages/Sensors";
import Settings from "./pages/Settings";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

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
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="devices" element={<Devices />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
