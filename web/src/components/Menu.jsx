
const Menu = () => {
  return (
    <div className="h-10 md:flex md:space-x-8">
      <div className="group">
        <button>Home</button>
        <div className="mx-2 group-hover:border-b group-hover:border-blue-800 dark:group-hover:border-white"></div>
      </div>
      <div className="group">
        <button>Dashboard</button>
        <div className="mx-2 group-hover:border-b group-hover:border-blue-800 dark:group-hover:border-white"></div>
      </div>
      <div className="group">
        <button>Settings</button>
        <div className="mx-2 group-hover:border-b group-hover:border-blue-800 dark:group-hover:border-white"></div>
      </div>
    </div>);
};

export default Menu;
