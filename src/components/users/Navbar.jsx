import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../admin/manage/DropDown";
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
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-6 text-xl font-semibold text-white">
          <li
            onClick={() => navigate("/accueil")}
            className="cursor-pointer hover:underline"
          >
            Accueil
          </li>
          <li className="cursor-pointer hover:underline">Services</li>
          <DropDown
            label="Gestion"
            className="text-xl text-white"
            items={["Utilisateurs", "Historiques"]}
            onItemClick={(item) => {
              if (item === "Utilisateurs") {
                navigate("/manage");
              } else if (item === "Historiques") {
                navigate("/historiques");
              }
            }}
          />
        </ul>

        <FontAwesomeIcon icon={faUser} 
        className="w-50 h-50 text-white cursor-pointer hover:underline"
        onClick={() => navigate("/Param")} />

      </div>
    </div>
  );
}

export default Navbar;
