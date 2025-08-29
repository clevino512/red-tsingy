import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/config.js';
import { FaTrash, FaEdit, FaLock } from 'react-icons/fa';

export default function Manage() {
  const [receptionistes, setReceptionistes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    password: '',
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  // Charger la liste depuis la base
  useEffect(() => {
    axios.get(`${API_BASE_URL}/register-recept`, { headers })
      .then((res) => setReceptionistes(res.data))
      .catch((err) => console.error('Erreur chargement réceptionnistes :', err));
  }, []);

  // Ajouter un réceptionniste
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/register-recept`, formData, { headers })
      .then((res) => {
        setReceptionistes((prev) => [...prev, res.data]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          nationality: '',
          password: '',
        });
      })
      .catch((err) => console.error('Erreur ajout :', err));
  };

  // Supprimer un réceptionniste avec confirmation
  const handleDelete = (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce réceptionniste ?")) {
      axios.delete(`${API_BASE_URL}/register-recept/${id}`, { headers })
        .then(() => setReceptionistes((prev) => prev.filter(r => r.id !== id)))
        .catch((err) => console.error('Erreur suppression :', err));
    }
  };

  // Modifier un réceptionniste
  const handleEdit = (id) => {
    const nouveauNom = prompt('Nouveau nom :');
    if (nouveauNom) {
      axios.put(`${API_BASE_URL}/register-recept/${id}`, { name: nouveauNom }, { headers })
        .then((res) => {
          setReceptionistes(prev =>
            prev.map(r => (r.id === id ? res.data : r))
          );
        })
        .catch((err) => console.error('Erreur modification :', err));
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Gestion des Réceptionnistes</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nom"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Téléphone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
        <select
          name="nationality"
          value={formData.nationality}
          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        >
          <option value="">Sélectionnez la nationalité</option>
          <option value="resident">Résident</option>
          <option value="non-resident">Non-Résident</option>
        </select>
        <div className="md:col-span-3 flex gap-4 items-center">
          <input
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Mot de passe"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <FaLock /> Ajouter
          </button>
        </div>
      </form>

      {/* Liste des réceptionnistes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Liste actuelle</h2>
        <ul className="space-y-4">
          {receptionistes.map(r => (
            <li key={r.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition">
              <div>
                <p className="font-bold text-gray-800">{r.name}</p>
                <p className="text-sm text-gray-500">{r.email} — {r.phone}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(r.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Modifier
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </li>
          ))}
          {receptionistes.length === 0 && (
            <li className="text-center text-gray-500">Aucun réceptionniste trouvé.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
