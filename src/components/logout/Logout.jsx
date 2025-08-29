import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      NProgress.start();
      try {
        const token = localStorage.getItem("token");
        if (token) {
          console.log("token", token);
          const response = await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          console.log("Déconnexion:", response.data);
            if(response){
              localStorage.removeItem("token");
              console.log(token)
              navigate("/login");
            }
        } else {
          console.log("Pas de token trouvé");
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion:", err);
      } finally {
        NProgress.done();
      }
    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;