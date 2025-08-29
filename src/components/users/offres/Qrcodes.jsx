import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { API_BASE_URL } from "../../../api/config";

export default function QrVerification() {
  const [scanResult, setScanResult] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [message, setMessage] = useState("");

  // Scanner QR code avec la caméra
  const startScan = () => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
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
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setUploadResult(response.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Impossible de décoder le QR code");
    }
  };

  // Confirmer le ticket du client
  const confirmTicket = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-ticket`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la confirmation");
    }
  };

  // Afficher les données comme reçu
  const renderReceipt = (data) => (
    <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded shadow bg-white">
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-700">Reçu du ticket</h3>
      {Object.entries(data).map(([key, value]) => (
        <p key={key} className="flex justify-between border-b py-1">
          <span className="font-medium">{key}</span>
          <span>{value.toString()}</span>
        </p>
      ))}
      <button
        onClick={() => confirmTicket(data)}
        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Vérifier le QR code
      </button>
    </div>
  );

  return (
    <div className=" mt-25 p-6 max-w-3xl mx-auto bg-red-400 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Vérification des Tickets</h1>

      {/* Scanner QR */}
      <div className="mb-8 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2 text-gray-800">Scanner avec la caméra</h2>
        <button
          onClick={startScan}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Démarrer le scanner
        </button>
        <div id="reader" className="mt-4"></div>
        {scanResult && renderReceipt({ QR_Data: scanResult })}
      </div>

      {/* Upload QR */}
      <div className="mb-8 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2 text-gray-800">Uploader une image QR</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-2 border rounded p-1"
        />
        {uploadResult && renderReceipt(uploadResult)}
      </div>

      {/* Message de confirmation */}
      {message && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded shadow text-center font-medium">
          {message}
        </div>
      )}
    </div>
  );
}
