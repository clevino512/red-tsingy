import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../api/config";

export default function HistoriqueQrClient() {
  const [clientId, setClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");

  // Récupérer la liste des clients pour le select
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/clients`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setClients(response.data);
        if (response.data.length > 0) setClientId(response.data[0].id);
      } catch (err) {
        console.error(err);
        setMessage("❌ Impossible de récupérer les clients");
      }
    };
    fetchClients();
  }, []);

  // Récupérer l'historique QR pour le client sélectionné
  const [historiques, setHistoriques] = useState([]);
  useEffect(() => {
    if (!clientId) return;

    const fetchHistorique = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/historique-qr`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setHistoriques(response.data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Impossible de récupérer l'historique des QR codes");
      }
    };

    fetchHistorique();
  }, [clientId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Historique des QR Codes</h1>

      {/* Sélecteur client */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Choisir un client :</label>
        <select
          value={clientId || ""}
          onChange={(e) => setClientId(Number(e.target.value))}
          className="border rounded-lg p-2 shadow-sm"
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded shadow text-center font-medium">
          {message}
        </div>
      )}

      {/* Tableau historique QR */}
      {historiques.length === 0 ? (
        <p className="text-center text-gray-600">Aucun QR scanné pour ce client.</p>
      ) : (
        <div className="space-y-4">
          {historiques.map((scan) => (
            <div
              key={scan.id}
              className="bg-white border rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">QR ID :</span> {scan.id}
                </p>
                <p>
                  <span className="font-semibold">Date :</span>{" "}
                  {new Date(scan.date).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Contenu :</span> {JSON.stringify(scan.data)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-2">
                  QR
                </div>
                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
