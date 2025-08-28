import { useNavigate } from 'react-router-dom';


export default function Tickets() {
  const navigate = useNavigate();

  const handleCommande = () =>
    navigate('/valider-commandes');

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-800 px-6 py-50 flex w-full h-screen flex-col items-center">
      
      {/* En-tête */}
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-purple-800">
          Explorez nos <span className="text-red-500">tickets</span>
        </h1>

        <p className="text-lg text-gray-700">
          Profitez de notre sélection adaptée à tous les profils : enfants, adultes, locaux et étrangers. 
          Vivez une expérience fluide et agréable.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={handleCommande} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
            Commencer la commande
          </button>
        </div>
      </div>

      {/* Tableau des tarifs */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-xl font-bold mb-2 text-purple-700">Adultes - Locaux</h3>
          <p className="text-2xl font-semibold text-red-500">15 000 Ar</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-xl font-bold mb-2 text-purple-700">Adultes - Étrangers</h3>
          <p className="text-2xl font-semibold text-red-500">30 000 Ar</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-xl font-bold mb-2 text-purple-700">Enfants - Locaux</h3>
          <p className="text-2xl font-semibold text-red-500">8 000 Ar</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-xl font-bold mb-2 text-purple-700">Enfants - Étrangers</h3>
          <p className="text-2xl font-semibold text-red-500">15 000 Ar</p>
        </div>
      </div>
    </section>
  );
}
