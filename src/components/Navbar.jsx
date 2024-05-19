import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" absolute top-0 left-0 w-full bg-white text-black h-auto p-3">
      <Link className="p-4">
        Home
      </Link>
      <Link className="p-4">
        Home
      </Link>
      <Link className="p-4">
        Home
      </Link>
    </nav>
  );
}

export default Navbar;
