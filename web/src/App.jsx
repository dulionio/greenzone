import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Layout from "./components/Layout";
import NoMatch from "./pages/NoMatch";
import Sensors from "./pages/Sensors";
import Settings from "./pages/Settings";

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
};

export default App;
