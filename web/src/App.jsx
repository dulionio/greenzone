import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import NoMatch from "./pages/NoMatch";
import Sensors from "./pages/Sensors";
import Settings from "./pages/Settings";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="h-screen" data-theme={darkMode ? "forest" : "garden"}>
      <div className="flex flex-col md:flex-row">
        <Navbar />
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
