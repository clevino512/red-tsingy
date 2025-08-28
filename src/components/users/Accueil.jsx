import React from 'react'
import { Link } from 'react-router-dom';


function Accueil() {
  return (
        <section className="bg-white text-black py-20 px-4">
        {/* Bloc de bienvenue */}
        <div className="flex flex-col justify-center items-center py-5 w-full h-1/2 mb-20">
            <h1 className="text-5xl text-red-400 font-bold text-center">BIENVENUE DANS NOTRE PLATEFORME</h1>
            <p className="mt-4 text-lg text-center">Ne vous tardez pas, faites dès maintenant votre commande</p>
        </div>

        {/* Bloc des offres */}
        <div>
            <h1 className="text-red-400 text-3xl text-center border-t-4 border-black/50 w-[80%] mx-auto mb-10">
            Offres Disponibles
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
            <Link to="/tickets">
                <div className="bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-lg shadow-md p-6 w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
                <h1 className="text-center text-white font-bold text-xl">Tickets</h1>
                </div>
            </Link>

            <Link to="/parkings">
                <div className="bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-lg shadow-md p-6 w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
                <h1 className="text-center text-white font-bold text-xl">Parkings</h1>
                </div>
            </Link>

            <Link to="/plats">
                <div className="bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-lg shadow-md p-6 w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
                <h1 className="text-center text-white font-bold text-xl">Plats</h1>
                </div>
            </Link>

            <Link to="/Hebergements">
                <div className="bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-lg shadow-md p-6 w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
                <h1 className="text-center text-white font-bold text-xl">Logements</h1>
                </div>
            </Link>
            </div>
        </div>
        </section>
  )
}

export default Accueil