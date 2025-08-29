import { useState, useEffect } from "react";
import EnvoyerCommandes from "./EnvoyerCommandes";
import {API_BASE_URL} from '../../../api/config'
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Commande() {
  const [formData, setFormData] = useState({
    number_resident_adulte: "",
    number_non_resident_adulte: "",
    number_resident_enfant:"",
    number_non_resident_enfant:"",
    vehicule: "",
    vehiculeCount: 0,
    hebergement: "",
    number_sejour: 1,
    dateEntree: "",
    dateExpiration: "",
    prixTotal: 0,
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const [copiedData, setCopiedData] = useState(null); // ✅ données copiées
const [test, setTest] = useState(null); 
useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        NProgress.start(); // start progress bar
        const response = await axios.get(`${API_BASE_URL}/commande-tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        
        setTest(response.data); // on stocke les données dans le state
        console.log("Prix tickets récupérés:", response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des prix:", err);
      } finally {
        NProgress.done(); // stop progress bar
      }
    };

    fetchData();
  }, []); // ne s'exécute qu'au montage
console.log(test)
  useEffect(() => {
    

    if (formData.dateEntree) {
      const date = new Date(formData.dateEntree);
      date.setDate(date.getDate() + 10);
      setFormData((prev) => ({
        ...prev,
        dateExpiration: date.toISOString().split("T")[0],
      }));
    }
  }, [formData.dateEntree]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "ticketCount",
      "adultes",
      "enfants",
      "etrangers",
      "nonEtrangers",
      "vehiculeCount",
      "hebergementCount",
    ];

    const safeValue = numericFields.includes(name)
      ? Math.max(0, parseInt(value) || 0)
      : value;

    setFormData((prev) => ({ ...prev, [name]: safeValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToCopy = { ...formData };

    // ✅ copie des données pour la popup
    setCopiedData(dataToCopy);

    console.log(copiedData)

    // ✅ ouvre popup sans envoyer encore
    setPopupVisible(true);
  };

  const handleCancel = () => {
    setFormData({
      ticketType: "",
      ticketCount: 1,
      adultes: 0,
      enfants: 0,
      etrangers: 0,
      nonEtrangers: 0,
      vehicule: "",
      vehiculeCount: 0,
      hebergement: "",
      hebergementCount: 1,
      dateEntree: "",
      dateExpiration: "",
      prixTotal: 0,
    });
    setPopupVisible(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-300 px-6 py-12 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-2">
          Formulaire de Commande
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Veuillez remplir les informations pour générer votre facture.
        </p>

           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tickets */}
          <div>
            <label className="block mb-1 font-semibold">Type de Ticket</label>
            <select name="ticketType" value={formData.ticketType} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full">
              <option value="">-- Choisir --</option>
              <option value="Personnel">Personnel</option>
              <option value="Groupe">Groupe</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre de Tickets</label>
            <input name="ticketCount" type="number" min="0" value={formData.ticketCount} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          {/* Répartition */}
          <div>
            <label className="block mb-1 font-semibold">Nombre résidents adultes</label>
            <input name="adultes" type="number" min="0" value={formData.adultes} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre résidents Enfants</label>
            <input name="enfants" type="number" min="0" value={formData.enfants} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre non-résidents adultes</label>
            <input name="etrangers" type="number" min="0" value={formData.etrangers} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre non-résidents enfants </label>
            <input name="nonEtrangers" type="number" min="0" value={formData.nonEtrangers} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          {/* Parkings */}
          <div>
            <label className="block mb-1 font-semibold">Type de Véhicule</label>
            <select name="vehicule" value={formData.vehicule} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full">
              <option value="">-- Choisir --</option>
              <option value="Vélo">Vélo</option>
              <option value="Moto">Moto</option>
              <option value="Voiture">Voiture</option>
              <option value="Hélicoptère">Hélicoptère</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre de Véhicules</label>
            <input name="vehiculeCount" type="number" min="0" value={formData.vehiculeCount} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          {/* Hébergements */}
          <div>
            <label className="block mb-1 font-semibold">Type d'Hébergement</label>
            <select name="hebergement" value={formData.hebergement} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full">
              <option value="">-- Choisir --</option>
              <option value="Tente">Tente</option>
              <option value="Camping">Camping</option>
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="block mb-1 font-semibold">Date de Visite</label>
            <input name="dateEntree" type="date" value={formData.dateEntree} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Date d'Expiration</label>
            <input name="dateExpiration" type="date" value={formData.dateExpiration} readOnly
              className="border border-gray-300 p-3 rounded w-full bg-gray-100" />
          </div>
        </form>

          {/* 👉 tes champs inchangés
        </form> */}

        <div className="mt-10 text-center flex justify-evenly">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-3 rounded transition duration-300"
          >
            Annuler la commande
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
            onClick={handleSubmit}
          >
            Soumettre la commande
          </button>
        </div>
      </div>

      {/* ✅ Affichage de la popup avec données copiées */}
      {popupVisible && (
        <ValiderCommande data={copiedData} onClose={() => setPopupVisible(false)} />
      )}
    </section>
  );
}
