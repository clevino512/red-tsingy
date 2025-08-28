import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FaUser, FaChild, FaMoneyBillWave, FaCar, FaGlobe, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function Historiques() {
  const [commandes] = useState([
    { id: 1, nomClient: "Rakoto", ticketCount: 2, vehiculeCount: 1, hebergementCount: 0, statut: "utilisé", prixTotal: 20000, isAdulte: true, isEtranger: false, date: "2025-08-01" },
    { id: 2, nomClient: "Rabe", ticketCount: 3, vehiculeCount: 0, hebergementCount: 1, statut: "en cours", prixTotal: 30000, isAdulte: false, isEtranger: true, date: "2025-08-03" },
    { id: 3, nomClient: "Randria", ticketCount: 1, vehiculeCount: 1, hebergementCount: 1, statut: "utilisé", prixTotal: 25000, isAdulte: true, isEtranger: true, date: "2025-07-28" },
    { id: 4, nomClient: "Jean", ticketCount: 5, vehiculeCount: 2, hebergementCount: 0, statut: "en cours", prixTotal: 50000, isAdulte: false, isEtranger: false, date: "2025-08-10" },
  ]);

  const [search, setSearch] = useState("");
  const [filterAge, setFilterAge] = useState("all");
  const [filterOrigine, setFilterOrigine] = useState("all");
  const [periode, setPeriode] = useState("total");

  // 🔹 Filtrage principal
  const commandesFiltrees = commandes.filter(cmd => {
    const searchMatch = cmd.nomClient.toLowerCase().includes(search.toLowerCase()) || cmd.id.toString().includes(search);
    const ageMatch = filterAge === "all" || (filterAge === "adulte" && cmd.isAdulte) || (filterAge === "enfant" && !cmd.isAdulte);
    const origineMatch = filterOrigine === "all" || (filterOrigine === "local" && !cmd.isEtranger) || (filterOrigine === "etranger" && cmd.isEtranger);
    return searchMatch && ageMatch && origineMatch;
  });

  // 🔹 Filtrage par période
  const filterByPeriode = (cmds) => {
    if (periode === "jour") {
      const today = new Date().toISOString().slice(0, 10);
      return cmds.filter(c => c.date === today);
    } else if (periode === "mois") {
      const month = new Date().toISOString().slice(0, 7);
      return cmds.filter(c => c.date.startsWith(month));
    } else if (periode === "annee") {
      const year = new Date().getFullYear().toString();
      return cmds.filter(c => c.date.startsWith(year));
    }
    return cmds;
  };

  const commandesPeriode = filterByPeriode(commandesFiltrees);

  // 🔹 Totaux par catégorie
  const totalAdulte = commandesPeriode.filter(c => c.isAdulte).reduce((acc, c) => acc + c.prixTotal, 0);
  const totalEnfant = commandesPeriode.filter(c => !c.isAdulte).reduce((acc, c) => acc + c.prixTotal, 0);
  const totalLocal = commandesPeriode.filter(c => !c.isEtranger).reduce((acc, c) => acc + c.prixTotal, 0);
  const totalEtranger = commandesPeriode.filter(c => c.isEtranger).reduce((acc, c) => acc + c.prixTotal, 0);

  const totalTickets = commandesPeriode.reduce((acc, c) => acc + c.ticketCount * (c.prixTotal / c.ticketCount), 0);
  const totalVehicules = commandesPeriode.reduce((acc, c) => acc + c.vehiculeCount * 5000, 0);
  const totalHebergements = commandesPeriode.reduce((acc, c) => acc + c.hebergementCount * 10000, 0);

  // 🔹 Total général
  const totalGeneral = totalAdulte + totalEnfant + totalLocal + totalEtranger + totalTickets + totalVehicules + totalHebergements;

  const dataGraph = [
    { name: "Adultes", value: totalAdulte },
    { name: "Enfants", value: totalEnfant },
    { name: "Locaux", value: totalLocal },
    { name: "Étrangers", value: totalEtranger },
  ];

  const COLORS = ["#4ade80", "#f472b6", "#3b82f6", "#facc15"];

  // 🔹 Fonction PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Historique des Commandes", 14, 22);
    doc.setFontSize(12);
    doc.text(`Période: ${periode}`, 14, 30);

    const tableColumn = ["ID", "Client", "Tickets", "Véhicules", "Hébergements", "Statut", "Prix Total (Ar)", "Date"];
    const tableRows = [];

    commandesPeriode.forEach(cmd => {
      const rowData = [
        cmd.id,
        cmd.nomClient,
        cmd.ticketCount,
        cmd.vehiculeCount,
        cmd.hebergementCount,
        cmd.statut,
        cmd.prixTotal.toLocaleString(),
        new Date(cmd.date).toLocaleDateString()
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 40 });
    doc.save("historique_commandes.pdf");
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-6">📊 Historique des Commandes</h1>

      {/* Filtres + PDF */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <input
          type="text"
          placeholder="Rechercher par nom ou ID client..."
          className="border px-4 py-2 rounded w-full md:w-1/4 focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border px-4 py-2 rounded" value={filterAge} onChange={(e) => setFilterAge(e.target.value)}>
          <option value="all">Tous âges</option>
          <option value="adulte">Adultes</option>
          <option value="enfant">Enfants</option>
        </select>
        <select className="border px-4 py-2 rounded" value={filterOrigine} onChange={(e) => setFilterOrigine(e.target.value)}>
          <option value="all">Toutes origines</option>
          <option value="local">Locaux</option>
          <option value="etranger">Étrangers</option>
        </select>
        <select className="border px-4 py-2 rounded" value={periode} onChange={(e) => setPeriode(e.target.value)}>
          <option value="total">Total</option>
          <option value="jour">Aujourd'hui</option>
          <option value="mois">Ce mois</option>
          <option value="annee">Cette année</option>
        </select>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 transition"
          onClick={exportPDF}
        >
          <FaFilePdf /> Exporter PDF
        </button>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto mb-8">
        <h2 className="text-2xl font-bold mb-4">Liste des Commandes</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Tickets</th>
              <th className="border px-4 py-2">Véhicules</th>
              <th className="border px-4 py-2">Hébergements</th>
              <th className="border px-4 py-2">Statut</th>
              <th className="border px-4 py-2">Prix Total (Ar)</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {commandesPeriode.map(cmd => (
              <tr key={cmd.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">{cmd.id}</td>
                <td className="border px-4 py-2">{cmd.nomClient}</td>
                <td className="border px-4 py-2 text-center">{cmd.ticketCount}</td>
                <td className="border px-4 py-2 text-center">{cmd.vehiculeCount}</td>
                <td className="border px-4 py-2 text-center">{cmd.hebergementCount}</td>
                <td className={`border px-4 py-2 text-center font-semibold ${cmd.statut === "utilisé" ? "text-green-600" : "text-orange-600"}`}>{cmd.statut}</td>
                <td className="border px-4 py-2 text-right">{cmd.prixTotal.toLocaleString()}</td>
                <td className="border px-4 py-2 text-center">{new Date(cmd.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {commandesPeriode.length === 0 && (
              <tr>
                <td colSpan="8" className="border px-4 py-2 text-center">Aucune commande trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cartes + total général */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaUser className="text-green-600 text-3xl mb-2" />
          <span className="font-bold">Adultes</span>
          <span className="text-xl font-semibold text-green-700">{totalAdulte} Ar</span>
        </div>
        <div className="bg-pink-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaChild className="text-pink-600 text-3xl mb-2" />
          <span className="font-bold">Enfants</span>
          <span className="text-xl font-semibold text-pink-700">{totalEnfant} Ar</span>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaGlobe className="text-blue-600 text-3xl mb-2" />
          <span className="font-bold">Locaux</span>
          <span className="text-xl font-semibold text-blue-700">{totalLocal} Ar</span>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaGlobe className="text-yellow-600 text-3xl mb-2" />
          <span className="font-bold">Étrangers</span>
          <span className="text-xl font-semibold text-yellow-700">{totalEtranger} Ar</span>
        </div>
        <div className="bg-red-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaMoneyBillWave className="text-red-600 text-3xl mb-2" />
          <span className="font-bold">Tickets</span>
          <span className="text-xl font-semibold text-red-700">{totalTickets} Ar</span>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <FaCar className="text-purple-600 text-3xl mb-2" />
          <span className="font-bold">Véhicules + Hébergements</span>
          <span className="text-xl font-semibold text-purple-700">{totalVehicules + totalHebergements} Ar</span>
        </div>
        <div className="bg-gray-200 p-4 rounded-xl flex flex-col items-center shadow hover:shadow-lg transition">
          <span className="font-bold text-lg">Total Général</span>
          <span className="text-xl font-semibold">{totalGeneral.toLocaleString()} Ar</span>
        </div>
      </div>

      {/* Graphique circulaire */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Répartition par catégories</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={dataGraph}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {dataGraph.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>
    </section>
  );
}
