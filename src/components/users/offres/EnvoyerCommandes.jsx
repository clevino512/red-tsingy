import axios from "axios";
import { API_BASE_URL } from "../../../api/config";

export default function ValiderCommande({ data, onClose }) {
  if (!data) return null;

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/commande`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      alert("✅ Commande validée et envoyée !");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
      alert("❌ Erreur lors de la validation de la commande");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // clique à l'extérieur ferme la popup
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center"
        onClick={(e) => e.stopPropagation()} // empêche la fermeture si clic à l'intérieur
      >
        <h2 className="text-xl font-bold mb-4 text-red-500">
          Résumé de la commande
        </h2>
        <p>Type Ticket : {data.ticketType}</p>
        <p>Tickets : {data.ticketCount}</p>
        <p>Adultes : {data.adultes}</p>
        <p>Enfants : {data.enfants}</p>
        <p>Étrangers : {data.etrangers}</p>
        <p>Non-Étrangers : {data.nonEtrangers}</p>
        <p>Véhicule : {data.vehicule} ({data.vehiculeCount})</p>
        <p>Hébergement : {data.hebergement} ({data.hebergementCount})</p>
        <p>Date entrée : {data.dateEntree}</p>
        <p>Date expiration : {data.dateExpiration}</p>
        <p className="font-bold mt-3">Prix Total : {data.prixTotal} Ar</p>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded"
          >
            Fermer
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
