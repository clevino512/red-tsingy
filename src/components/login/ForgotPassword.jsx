import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/config";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Mot de passe oublier";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
  
    try {
      NProgress.start();
      const res = await axios.post(
        `${API_BASE_URL}/forgot-password`,
        { email },
        { withCredentials: true }
      );
  
      setMessage(res.data.message || "Un email de réinitialisation a été envoyé !");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 422) {
          setError(err.response.data.errors.email[0]);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Une erreur est survenue.");
        }
      } else {
        setError("Impossible de contacter le serveur.");
      }
    } finally {
      NProgress.done();
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Mot de passe oublié
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2 w-5 h-5" />
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-0 focus:ring-0 outline-none"
            />
          </div>

          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}
