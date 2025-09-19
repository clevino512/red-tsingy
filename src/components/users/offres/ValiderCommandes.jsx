import { useState, useEffect } from "react";
import EnvoyerCommandes from "./EnvoyerCommandes";
import { API_BASE_URL } from "../../../api/config";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Commande() {
  const [formData, setFormData] = useState({
    number_resident_adulte: 0,
    number_non_resident_adulte: 0,
    number_resident_enfant: 0,
    number_non_resident_enfant: 0,
    vehicule: "",
    vehiculeCount: 0,
    hebergement: "",
    number_sejour: 1,
    dateEntree: "",
    dateExpiration: "",
    prixTotal: 0,
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const [copiedData, setCopiedData] = useState(null);
  const [test, setTest] = useState(null);

  // // 🔹 Récupération des tarifs depuis le backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     try {
  //       NProgress.start();
  //       const response = await axios.get(`${API_BASE_URL}/commande-tickets`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       });

  //       setTest(response.data);
  //       console.log("Prix tickets récupérés:", response.data);
  //     } catch (err) {
  //       console.error("Erreur lors de la récupération des prix:", err);
  //     } finally {
  //       NProgress.done();
  //     }
  //   };

  //   fetchData();
  // }, []);

  // 🔹 Calcul automatique de la date d’expiration (10 jours après la date d’entrée)
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

  // 🔹 Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "number_resident_adulte",
      "number_non_resident_adulte",
      "number_resident_enfant",
      "number_non_resident_enfant",
      "vehiculeCount",
      "number_sejour",
    ];

    const safeValue = numericFields.includes(name)
      ? Math.max(0, parseInt(value) || 0)
      : value;

    setFormData((prev) => ({ ...prev, [name]: safeValue }));
  };

  // 🔹 Envoi de la commande
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour passer une commande.");
        return;
      }

        // ✅ Affiche les données dans la console
        console.log("Token :", token);
        console.log("Données de la commande à envoyer :", formData);

      NProgress.start();

      const response = await axios.post(
        `${API_BASE_URL}/commande-tickets`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Commande envoyée :", response.data);
      alert("Votre commande a été envoyée avec succès !");

      // Réinitialisation du formulaire
      setFormData({
        number_resident_adulte: 0,
        number_non_resident_adulte: 0,
        number_resident_enfant: 0,
        number_non_resident_enfant: 0,
        vehicule: "",
        vehiculeCount: 0,
        hebergement: "",
        number_sejour: 1,
        dateEntree: "",
        dateExpiration: "",
        prixTotal: 0,
      });

    } catch (err) {
      console.error("❌ Erreur lors de l’envoi de la commande :", err);
      alert("Erreur lors de l’envoi de votre commande. Réessayez.");
    } finally {
      NProgress.done();
    }
  };

  // 🔹 Annuler la commande
  const handleCancel = () => {
    setFormData({
      number_resident_adulte: 0,
      number_non_resident_adulte: 0,
      number_resident_enfant: 0,
      number_non_resident_enfant: 0,
      vehicule: "",
      vehiculeCount: 0,
      hebergement: "",
      number_sejour: 1,
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
          {/* Répartition */}
          <div>
            <label className="block mb-1 font-semibold">Nombre résidents adultes</label>
            <input name="number_resident_adulte" type="number" min="0" value={formData.number_resident_adulte} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre résidents enfants</label>
            <input name="number_resident_enfant" type="number" min="0" value={formData.number_resident_enfant} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre non-résidents adultes</label>
            <input name="number_non_resident_adulte" type="number" min="0" value={formData.number_non_resident_adulte} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre non-résidents enfants</label>
            <input name="number_non_resident_enfant" type="number" min="0" value={formData.number_non_resident_enfant} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
          </div>

          {/* Véhicules */}
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

          {/* Hébergement */}
          <div>
            <label className="block mb-1 font-semibold">Type d'Hébergement</label>
            <select name="hebergement" value={formData.hebergement} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full">
              <option value="">-- Choisir --</option>
              <option value="Tente">Tente</option>
              <option value="Camping">Camping</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nombre de jours de séjour</label>
            <input name="number_sejour" type="number" min="1" value={formData.number_sejour} onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full" />
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

        {/* Boutons */}
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

      {/* Popup      {popupVisible && (
        <EnvoyerCommandes data={copiedData} onClose={() => setPopupVisible(false)} />
      )} */}

    </section>
  );
}
