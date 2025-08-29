import React from 'react'

import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode"; // librairie pour scanner QR
import axios from "axios";
import { API_BASE_URL } from "../../../api/config";



function QrVerification() {
  const [scanResult, setScanResult] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [message, setMessage] = useState("");

  // Scanner QR code avec la caméra
  const startScan = () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );
    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear(); // arrêter le scanner après lecture
      },
      (error) => {
        console.warn("QR scan error", error);
      }
    );
  };

  // Upload image pour décoder QR code
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("qrImage", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/decode-qr`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadResult(response.data);
    } catch (err) {
      console.error(err);
      setMessage("Impossible de décoder le QR code");
    }
  };

  // Confirmer le ticket du client
  const confirmTicket = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-ticket`, data);
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la confirmation");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vérification des tickets</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Scanner QR code</h2>
        <button
          onClick={startScan}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Démarrer le scanner
        </button>
        <div id="reader" className="mt-4"></div>
        {scanResult && (
          <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
            Résultat : {scanResult}
            <button
              onClick={() => confirmTicket({ qrData: scanResult })}
              className="ml-4 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirmer
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Uploader QR code</h2>
        <input type="file" accept="image/*" onChange={handleUpload} />
        {uploadResult && (
          <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
            Résultat : {JSON.stringify(uploadResult)}
            <button
              onClick={() => confirmTicket(uploadResult)}
              className="ml-4 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirmer
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">{message}</div>
      )}
    </div>
  );
}

export default QrVerification;
