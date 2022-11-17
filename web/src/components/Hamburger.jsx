import { useState } from 'react';
import './Hamburger.css'

const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(!isOpen)}
          className={"z-40 block hamburger md:hidden focus:outline-none" + (isOpen && " open")}>
        <span className="top bg-black dark:bg-white"></span>
        <span className="middle bg-black dark:bg-white"></span>
        <span className="bottom bg-black dark:bg-white"></span>
      </button>
    </div>);
};

export default Hamburger;
