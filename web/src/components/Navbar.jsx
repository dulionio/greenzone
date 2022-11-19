const Navbar = () => {
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
            <li><a href="/">Dashboard</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/sensors">Sensors</a></li>
            <li><a href="/devices">Devices</a></li>
          </ul>
        </div>
        <button className="btn btn-ghost normal-case text-xl">GreenZone</button>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal p-0">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/sensors">Sensors</a></li>
          <li><a href="/devices">Devices</a></li>
        </ul>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}

export default Navbar;
