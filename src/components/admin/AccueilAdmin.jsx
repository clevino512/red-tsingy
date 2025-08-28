import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGlobe } from "react-icons/fa";


// Importation des images
import image1 from "/src/assets/image1.jpg";
import image2 from "/src/assets/image2.jpg";
import image3 from "/src/assets/images3.png";

export default function Dashboard({ commandesFiltrees }) {
  const images = [image1, image2, image3];
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setBgImage(images[randomIndex]);
    }, 5000); // change toutes les 5 secondes
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative w-full">
      {/* Hero Section */}
<div
        className="w-full h-[90vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Bienvenue sur Notre Plateforme
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6">
            Profitez de nos services innovants et adaptés à vos besoins.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button className="bg-red-400 hover:bg-red-500 transition px-6 py-3 rounded font-semibold">
              Découvrir
            </button>
            <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded font-semibold">
              Nous Contacter
            </button>
          </div>

          {/* Icônes réseaux sociaux */}
          <div className="flex justify-center gap-6 space-x-4 text-5xl">
            <a
              href="mailto:contact@tonsite.com"
              className="hover:text-red-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://facebook.com/tonpage"
              className="hover:text-red-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://tonsite.com"
              className="hover:text-red-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>

      {/* Section Services */}
      <div className="bg-white py-16 px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-8 -mt-24 relative z-10">
        <Link to="/tickets">
          <div className="bg-red-400 rounded-lg shadow p-6 text-center hover:bg-gray-200 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Service tickets</h3>
            <p className="text-gray-800">Description courte du service tickets.</p>
          </div>
        </Link>

        <Link to="/parkings">
          <div className="bg-red-400 rounded-lg shadow p-6 text-center hover:bg-gray-200 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Service parkings</h3>
            <p className="text-gray-800">Description courte du service parkings.</p>
          </div>
        </Link>

        <Link to="/hebergements">
          <div className="bg-red-400 rounded-lg shadow p-6 text-center hover:bg-gray-200 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Service hébergements</h3>
            <p className="text-gray-800">Description courte du service hébergements.</p>
          </div>
        </Link>

        <Link to="/plats">
          <div className="bg-red-400 rounded-lg shadow p-6 text-center hover:bg-gray-200 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Service plats</h3>
            <p className="text-gray-800">Description courte du service plats.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
