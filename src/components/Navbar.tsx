import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-2">
          {/* Clickable Icon */}
          <Link to="/" className="flex items-center">
            <img
              src="/icons/logo-white.png"
              alt="Logo"
              className="w-12 h-12"
              style={{ height: "50px", width: "50px", marginRight: "20px" }}
            />
          </Link>

          {/* Name Banner (Visible Only on Desktop) */}
          <h1 className="hidden md:block text-2xl font-bold">
            <Link to="/">Elor Itzkovitz</Link>
          </h1>
        </div>

        {/* Hamburger Menu Button (Visible Only on Mobile) */}
        <button
          className={`hamburger-button md:hidden ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu */}
        <ul
          className={`flex flex-col md:flex-row md:space-x-8 fixed md:static top-0 right-0 h-full w-1/2 md:w-auto bg-white md:bg-transparent text-black md:text-white transition-all duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center space-x-2 px-4 py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser /> <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="flex items-center space-x-2 px-4 py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaProjectDiagram /> <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-4 py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaEnvelope /> <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
