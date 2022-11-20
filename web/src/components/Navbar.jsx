import { NavLink } from "react-router-dom";

const Navbar = ({darkMode, onModeClick}) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><NavLink to="/" >Dashboard</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
            <li><NavLink to="/sensors">Sensors</NavLink></li>
            <li><NavLink to="/devices">Devices</NavLink></li>
          </ul>
        </div>
        <button className="btn btn-ghost normal-case text-xl">
          <span class="material-symbols-outlined">spa</span>
          <span className="ml-1">GreenZone</span>
        </button>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal rounded-box bg-base-100 p-2">
          <li><NavLink to="/" >Dashboard</NavLink></li>
          <li><NavLink to="/settings">Settings</NavLink></li>
          <li><NavLink to="/sensors">Sensors</NavLink></li>
          <li><NavLink to="/devices">Devices</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={onModeClick}>
          <span className="material-symbols-outlined">{darkMode ? "light_mode" : "dark_mode"}</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
