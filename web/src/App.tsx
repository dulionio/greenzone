import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './compontents/Layout';
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Devices from './pages/Devices';
import History from './pages/History';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="devices" element={<Devices />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
