import { useNavigate } from 'react-router-dom';

export default function Plats() {
  const navigate = useNavigate();

  const handleCommande = () => {
    navigate('/valider-commandes'); // Redirige vers la page de commande des plats
  };

  return (
    <section className="mt-20 min-h-screen bg-white text-black px-6 py-12 flex flex-col items-center">
      {/* En-tête */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Bienvenue dans notre espace restauration</h1>
        <p className="text-lg">
          Faites de votre petit déjeuner, déjeuner ou dîner un moment savoureux. Notre service de restauration est disponible <strong>7j/7</strong> et <strong>24h/24</strong>, pour répondre à vos envies à tout moment.
        </p>
      </div>

      {/* Types de repas */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Plats disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-100 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">🍳 Petit Déjeuner</h3>
            <p className="text-gray-700">Viennoiseries, jus frais, café</p>
          </div>
          <div className="bg-green-100 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">🍛 Déjeuner</h3>
            <p className="text-gray-700">Plats traditionnels, grillades, salades</p>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">🍲 Dîner</h3>
            <p className="text-gray-700">Soupes, plats légers, desserts</p>
          </div>
        </div>
      </div>

      {/* Bouton de commande */}
      <button
        onClick={handleCommande}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
      >
        Commander maintenant
      </button>
    </section>
  );
}
