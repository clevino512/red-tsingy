import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';

import "./index.css";
import App from "./App.jsx";
import Login from "./components/login/Login.jsx";
import ForgotPassword from "./components/login/ForgotPassword.jsx";
import Logout from "./components/logout/Logout.jsx";
import Register from "./components/register/Register.jsx";
import Manage from "./components/admin/manage/manage.jsx";
import Historiques from "./components/admin/manage/Historiques.jsx";
import Profile from "./components/users/Param.jsx";


// accueil 
import AdminAccueil from "./components/admin/AccueilAdmin.jsx";

// Composants de pages
import Tickets from "./components/users/pages/Tickets.jsx";
import Parkings from "./components/users/pages/Parkings.jsx";
import Hebergements from "./components/users/pages/Hebergements.jsx";
import Plats from "./components/users/pages/Plats.jsx";

//offres 
import ValiderCommandes from "./components/users/offres/ValiderCommandes.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/app" element={<App />} />
        


        {/* Pages utilisateurs */}
        <Route element={<Layout />}>
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/parkings" element={<Parkings />} />
          <Route path="/hebergements" element={<Hebergements />} />
          <Route path="/plats" element={<Plats />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/historiques" element={<Historiques />} />
          <Route path="/param" element={< Profile />} />
        </Route>


        {/* Offres */}
        <Route element={<Layout />}>
          <Route path="/valider-commandes" element={<ValiderCommandes />} />
        </Route>
        <Route element={<Layout />}>
            <Route path="/accueil" element={<AdminAccueil />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
