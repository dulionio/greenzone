import { useState } from "react";
import Hamburger from "./components/Hamburger";
import Menu from "./components/Menu";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={"p-10" + (darkMode && " dark")}>
      <div className="bg-white text-slate-800 dark:bg-slate-800 dark:text-white h-screen">
        <div className="flex flex-col md:flex-row px-2 pt-2">
          <Hamburger />
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default App;
