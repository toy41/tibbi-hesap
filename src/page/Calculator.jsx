import { useParams, useNavigate } from "react-router-dom";
import { calculators } from "../data/calculators";
import { useFavorites } from "../hooks/useFavorites";

import Cha2ds2Calc from "../components/calculators/Cha2ds2Calc";
import ChecklistCalc from "../components/calculators/ChecklistCalc";
import GksCalc from "../components/calculators/GksCalc";
import BmiCalc from "../components/calculators/BmiCalc";
import EpdsCalc from "../components/calculators/EpdsCalc";

const componentMap = {
  cha2ds2: Cha2ds2Calc,
  checklist: ChecklistCalc,
  gks: GksCalc,
  bmi: BmiCalc,
  epds: EpdsCalc,
};

export default function Calculator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const calc = calculators.find((c) => c.id === id);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!calc) return <div className="p-6">Hesaplayıcı bulunamadı.</div>;

  const catColors = { 
    kardiyoloji: "bg-red-50 text-red-700", 
    acil: "bg-orange-50 text-orange-700", 
    noroloji: "bg-purple-50 text-purple-700", 
    psikiyatri: "bg-indigo-50 text-indigo-700", 
    "kadin-dogum": "bg-pink-50 text-pink-700",  
    genel: "bg-teal-50 text-teal-700" 
  };
  const ActiveCalculator = componentMap[calc.type] || (() => <div>Bileşen bulunamadı.</div>);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-12">
      <button onClick={() => navigate("/")} className="text-blue-600 text-sm mb-5 hover:underline flex items-center gap-1 font-medium">← Ana sayfa</button>
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm text-left">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[calc.category]}`}>{calc.category}</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-3">{calc.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{calc.description}</p>
        <button onClick={() => toggleFavorite(calc.id)} className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-yellow-500 transition">
          {isFavorite(calc.id) ? "⭐ Favorilerden çıkar" : "☆ Favorilere ekle"}
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <ActiveCalculator calc={calc} />
      </div>
    </div>
  );
}