import { useNavigate } from 'react-router-dom';

export default function Hebergements() {
  const navigate = useNavigate();

  const handleReservation = () => {
    navigate('/valider-commandes'); // Redirige vers la page de réservation
  };

  return (
    <section className="min-h-screen bg-white text-black px-6 py-12 flex flex-col items-center">
      {/* En-tête */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Bienvenue dans notre espace Hébergements</h1>
        <p className="text-lg">
          Que vous soyez amateur d’aventure ou en quête de confort, nous vous proposons deux larges choix pour passer la nuit :
          <strong> dormir sous tente</strong> ou profiter de notre <strong>camping aménagé</strong>. À vous de choisir votre expérience.
        </p>
      </div>

      {/* Options d'hébergement */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Nos formules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">⛺ Sous Tente</h3>
            <p className="text-gray-700">Immersion totale en pleine nature. Tente fournie ou personnelle. <br />Tarif : 10 000 Ar / nuit</p>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">🏕️ Camping Aménagé</h3>
            <p className="text-gray-700">Emplacement équipé avec sanitaires, électricité et sécurité. <br />Tarif : 20 000 Ar / nuit</p>
          </div>
        </div>
      </div>

      {/* Bouton de réservation */}
      <button
        onClick={handleReservation}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
      >
        Réserver votre nuit
      </button>
    </section>
  );
}


// API de hebergements 
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Hebergements() {
//   const navigate = useNavigate();
//   const [hebergements, setHebergements] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3000/api/hebergements') // adapte l'URL à ton backend
//       .then((res) => {
//         setHebergements(res.data); // attend un tableau d'objets [{id, categorie, prix}]
//       })
//       .catch((err) => {
//         console.error('Erreur lors du chargement des hébergements :', err);
//       });
//   }, []);

//   const handleReservation = () => {
//     navigate('/valider-commandes');
//   };

//   return (
//     <section className="min-h-screen bg-white text-black px-6 py-12 flex flex-col items-center">
//       {/* En-tête */}
//       <div className="max-w-3xl text-center mb-12">
//         <h1 className="text-4xl font-bold text-red-500 mb-4">Bienvenue dans notre espace Hébergements</h1>
//         <p className="text-lg">
//           Que vous soyez amateur d’aventure ou en quête de confort, nous vous proposons plusieurs options pour passer la nuit : tente ou camping aménagé. Choisissez votre expérience.
//         </p>
//       </div>

//       {/* Options dynamiques */}
//       <div className="w-full max-w-4xl mb-12">
//         <h2 className="text-2xl font-semibold text-center mb-6">Nos formules</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {hebergements.map((h) => (
//             <div key={h.id} className="bg-gray-100 p-6 rounded shadow text-center">
//               <h3 className="text-xl font-bold mb-2">{h.categorie}</h3>
//               <p className="text-gray-700">{h.prix.toLocaleString()} Ar / nuit</p>
//               <p className="text-sm text-gray-500 mt-2">ID : {h.id}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bouton de réservation */}
//       <button
//         onClick={handleReservation}
//         className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
//       >
//         Réserver votre nuit
//       </button>
//     </section>
//   );
// }
