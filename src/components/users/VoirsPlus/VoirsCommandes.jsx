import React, { useState } from "react";
import clientsSimules from "./clientsSimules.json";

export default function EspaceClient() {
  const [clientId, setClientId] = useState(clientsSimules[0].id);
  const client = clientsSimules.find(c => c.id === clientId);

  const imprimerRecu = (paiement) => {
    alert(`Impression du reçu ${paiement.numero_recu}`);
  };

  const voirQRCode = (paiement) => {
    alert(`Affichage QR Code pour ${paiement.numero_recu}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">VOTRE ESPACE CLIENT</h1>

      {/* Sélecteur client */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Choisir un client :</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
          className="border rounded-lg p-2 shadow-sm"
        >
          {clientsSimules.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
      </div>

      {/* Tableau commandes par année */}
      {["2025", "2024", "2023"].map((annee, idx) => (
        <div key={annee} className="mb-6 bg-white border rounded-lg shadow-md">
          <div className="px-4 py-2 border-b cursor-pointer bg-gray-100 hover:bg-gray-200 font-semibold">
            COMMANDES EN {annee}
          </div>
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border">Commande #</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Destinataire</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Statut</th>
                <th className="px-4 py-2 border">Facture</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {client.commandes
                .filter(c => c.date.startsWith(annee))
                .map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{c.id}</td>
                    <td className="px-4 py-2 border">{c.date}</td>
                    <td className="px-4 py-2 border">Boutique Swann et Oscar</td>
                    <td className="px-4 py-2 border">{c.prix} MGA</td>
                    <td className="px-4 py-2 border">{c.statut}</td>
                    <td className="px-4 py-2 border text-blue-600 underline cursor-pointer">En PDF</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        onClick={() => imprimerRecu(c)}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Imprimer reçu
                      </button>
                      <button
                        onClick={() => voirQRCode(c)}
                        className="bg-red-00 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Voir QR Code
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Section Bon d'achats */}
      <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-2">Reçu de Bon d'Achats</h2>
        {client.paiements.map(p => (
          <div key={p.id} className="flex justify-between items-center bg-yellow-100 p-3 rounded mb-2 shadow-sm">
            <div>
              <p className="font-semibold">Montant : {p.montant} MGA</p>
              <p>Numéro de reçu : {p.numero_recu}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-2">
                QR
              </div>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
