import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoTsingy from "../../assets/logoTsingy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 py-2 h-[80px] transition-opacity duration-200 ${
        scrolled ? "bg-red-400 opacity-25" : "bg-red-400 opacity-100"
      }`}
    >
      {/* Logo + Titre */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold flex items-center text-white">
          <img
            src={logoTsingy}
            alt="Logo Tsingy Rouge"
            className="h-10 md:h-14 inline-block mr-2"
          />
          <span className="font-bold">TSINGY ROUGE</span>
        </h1>
      </div>

      {/* Menu + Déconnexion */}
      <div className="flex items-center space-x-20 pr-12">
        <ul className="flex space-x-6 text-xl font-semibold text-white">
          <li
            onClick={() => navigate("/Admin-accueil")}
            className="cursor-pointer hover:underline"
          >
            Accueil
          </li>
          <li className="cursor-pointer hover:underline">Services</li>

          {/* 🔥 Menu Gestion au hover */}
          <li className="relative group cursor-pointer">
            <span>Gestion</span>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <button
                onClick={() => navigate("/manage")}
                className="block w-full text-center px-4 py-2 hover:bg-red-100 whitespace-nowrap"
              >
                Utilisateurs
              </button>
              <button
                onClick={() => navigate("/historiques")}
                className="block w-full text-center px-4 py-2 hover:bg-red-100 whitespace-nowrap"
              >
                Historiques
              </button>
            </div>
          </li>
        </ul>

        {/* 🔥 Menu User au hover */}
        <div className="relative group cursor-pointer hover:scale-110 transition-transform duration-200">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-500 hover:bg-red-200 transition">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
            <button
              onClick={() => navigate("/Param")}
              className="block w-full text-center px-4 py-2 hover:bg-red-100 whitespace-nowrap"
            >
              Gérer mon compte
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="block w-full text-center px-4 py-2 hover:bg-red-100 whitespace-nowrap"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
