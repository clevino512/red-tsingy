import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logTsingy from "../../assets/logoTsingy.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Animation titre
  const titre = "RED TSINGY";
  const [text, setText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    document.title = "Connexion";
  }, []);

  useEffect(() => {
    let timeout;
    if (i < titre.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + titre[i]);
        setI(i + 1);
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setText("");
        setI(0);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [i, titre]);

  // Soumission formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      NProgress.start();
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Connexion réussie:", response.data);

      const { access_token, roles } = response.data;
      const role = roles?.[0]?.toLowerCase(); // récupérer le premier rôle en minuscule

      if (access_token && role) {
        // Stocker token et rôle
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", role);

        console.log("Rôle:", role); // debug

        // Redirection selon rôle
        switch (role) {
          case "admin":
            navigate("/Admin-accueil");
            break;
          case "receptioniste":
          case "client":
            navigate("/Client-accueil");
            break;
          default:
            navigate("/register"); // fallback
        }
      } else {
        setError("Impossible de déterminer le rôle de l'utilisateur.");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Identifiants invalides !");
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gray-100 p-4">
      {/* Bloc gauche : Logo + Titre + Description */}
      <div className="text-center lg:w-1/2 mb-8 lg:mb-0">
        <img
          src={logTsingy}
          alt="Logo Tsingy"
          className="h-24 mx-auto mb-4 rounded shadow-lg"
        />
        <h1 className="text-4xl md:text-8xl font-bold text-red-600">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-gray-700 mt-2 text-lg max-w-xl mx-auto">
          Découvrez la majesté des <strong>Tsingy rouges</strong>, une merveille naturelle
          unique au monde. Entre falaises sculptées et paysages spectaculaires,
          chaque visite est une aventure inoubliable au cœur de la nature
          malgache.
        </p>
      </div>

      {/* Bloc droit : Formulaire */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Connexion à votre compte
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Se connecter
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">ou</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Connexion via réseaux sociaux */}
        <div className="space-y-3">
          <button
            onClick={() =>
              (window.location.href = `${API_BASE_URL}/auth/google/redirect`)
            }
            className="w-full flex items-center justify-center bg-[#DB4437] text-white py-2 rounded-lg hover:bg-[#C33D2F] transition"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Se connecter avec Google
          </button>

          <button className="w-full flex items-center justify-center bg-[#1877F2] text-white py-2 rounded-lg hover:bg-[#1565C0] transition">
            <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
            Se connecter avec Facebook
          </button>

          <button className="w-full flex items-center justify-center bg-[#1DA1F2] text-white py-2 rounded-lg hover:bg-[#0d95e8] transition">
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            Se connecter avec Twitter
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Créez un compte
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
