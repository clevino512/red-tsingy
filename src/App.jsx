import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import Navbar from './components/users/Navbar';
import Footer from './components/users/Footer';
import AdminAccueil from './components/admin/AccueilAdmin';


function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      
      <main className="flex-grow">
        <AdminAccueil/>
        {/* Ton contenu principal ici */}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
