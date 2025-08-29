import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../App.css";
import { API_BASE_URL } from "../../api/config";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faUserPlus,
  faIdCard, // ✅ import ajouté
} from "@fortawesome/free-solid-svg-icons";

import logoTsingy from "../../assets/logoTsingy.jpg";

function Register() {
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.8 });

  useEffect(() => {
    document.title = "Inscription";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      NProgress.start();
      const response = await axios.post(`${API_BASE_URL}register`, {
        name,
        email,
        phone,
        nationality,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        const messages = Object.values(validationErrors).flat();
        setErrors(messages);
      } else {
        setErrors(["Erreur serveur, veuillez réessayer"]);
      }
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img src={logoTsingy} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Créer un compte
        </h2>

        {/* Messages d'erreurs */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            <ul className="list-disc list-inside">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom complet */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* CIN */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faIdCard}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="CIN"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />
          </div>

          {/* Téléphone */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faPhone}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Téléphone"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Nationalité */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faIdCard}
              className="absolute left-3 top-3 text-gray-400"
            />
            <select
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">-- Sélectionner la nationalité --</option>
              <option value="resident">Résident</option>
              <option value="non-resident">Non-Résident</option>
            </select>
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirmation mot de passe */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            S'inscrire
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà un compte ?{" "}
          <a href="./login" className="text-blue-600 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
