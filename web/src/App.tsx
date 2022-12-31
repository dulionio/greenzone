import { Route, Routes } from 'react-router-dom';
import Layout from './compontents/Layout';
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Devices from './pages/Devices';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="devices" element={<Devices />} />
        <Route path="events" element={<Events />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
