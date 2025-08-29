import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import velo from "../../../assets/velo.webp";
import voiture from "../../../assets/voiture.webp";
import helico from "../../../assets/helico.jpg";
import moto from "../../../assets/moto.jfif";

const vehicles = [
  { name: "Parking Moto", priceMGA: 15000000, image: voiture },
  { name: "Parking Voiture", priceMGA: 25000000, image: moto },
  { name: "Parking Hélicoptère", priceMGA: 20000000, image: helico },
  { name: "Parking Vélo", priceMGA: "Offerte gratuitement", image: velo },
];

export default function Tickets() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rates, setRates] = useState({ EUR: 0.0002, USD: 0.00022 });
  const [currency, setCurrency] = useState("MGA");

  useEffect(() => {
    axios
      .get("https://api.exchangerate.host/latest?base=MGA&symbols=EUR,USD")
      .then((res) => setRates(res.data.rates))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicles.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const convertPrice = (priceMGA) => {
    if (typeof priceMGA === "string") return priceMGA; // texte gratuit
    if (currency === "MGA") return `${priceMGA.toLocaleString()} Ar`;
    if (currency === "EUR") return `${(priceMGA * rates.EUR).toFixed(2)} €`;
    if (currency === "USD") return `${(priceMGA * rates.USD).toFixed(2)} $`;
    return priceMGA;
  };

  const v = vehicles[currentIndex];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden mt-20">
      {/* Image de fond */}
      <img
        src={v.image}
        alt={v.name}
        className="absolute inset-0 w-full h-[80vh] object-cover transition-all duration-1000"
      />

      {/* Texte explicatif centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-4">
        <p className="bg-black/40 text-white text-lg md:text-2xl lg:text-3xl font-medium p-6 rounded-md max-w-3xl">
          Notre parking vous offre une sécurité maximale pour votre véhicule, avec un service garanti et un suivi 24h/24.
        </p>
        <button
          onClick={() => navigate("/valider-commandes")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-md text-lg md:text-xl transition"
        >
          Réserver maintenant
        </button>
      </div>

      {/* Nom et prix en bas */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-8 bg-gradient-to-t from-black/80 to-transparent text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{v.name}</h2>
        <p className="text-white text-lg md:text-2xl mt-2">{convertPrice(v.priceMGA)}</p>
      </div>
    </section>
  );
}
