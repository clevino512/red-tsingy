import React from 'react';
import { FaFacebookMessenger } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-left gap-6">
        {/* Bloc Services */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Services</h1>
          <ul className="space-y-1">
            <li>Événements</li>
            <li>Mes Commandes</li>
          </ul>
        </div>

        {/* Bloc Service Clients */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Service Clients</h1>
          <ul className="space-y-1">
            <li>+261 37 26 130 34</li>
            <li>+261 38 62 718 26</li>
          </ul>
        </div>

        {/* Bloc Contact avec icône */}
        <div className="w-full md:w-1/3">
          <h1 className="text-2xl font-bold mb-2">Nous Contacter</h1>
          <div className="relative">
            <FaFacebookMessenger className="absolute left-3 top-3 text-gray-600" />
            <input
              type="text"
              placeholder="Veuillez nous écrire"
             className="pl-10 pr-3 py-2 border text-black bg-amber-50 border-gray-300 rounded w-full focus:outline-none cursor-text focus:ring focus:ring-blue-300"/>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
