import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {API_BASE_URL} from '../../api/config.js'

import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faIdCard,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    password: "",
    idCard: "",
    username: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(true);


  // ⚡ Récupérer le token depuis localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 ajout du token
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // recoit des donées
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/user-update/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      console.log(user);
      alert("❌ Une erreur est survenue lors de la mise à jour.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-2">
          Modifier mes paramètres
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Vous pouvez modifier vos informations ci-dessous :
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nom */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              Téléphone
            </label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mot de passe */}
            <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Mot de passe
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={user.password_confirmation || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          </div>

          {/* Nationalité */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Nationalité
            </label>
            <input
              type="text"
              name="nationality"
              value={user.nationality || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton sur toute la largeur */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Enregistrer toutes les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
