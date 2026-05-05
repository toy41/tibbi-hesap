import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { calculators } from "../data/calculators";
import { useFavorites } from "../hooks/useFavorites";

const riskStyle = {
  low: "bg-green-50 text-green-800 border border-green-200",
  mid: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  high: "bg-red-50 text-red-800 border border-red-200",
};

function getInterp(interpret, score) {
  return interpret.find((i) => score <= i.max) || interpret[interpret.length - 1];
}

function ChecklistCalc({ calc }) {
  const [checked, setChecked] = useState({});
  const [result, setResult] = useState(null);

  const toggle = (i) => {
    setChecked((prev) => {
      const next = { ...prev };
      next[i] ? delete next[i] : (next[i] = calc.items[i].pts);
      return next;
    });
    setResult(null);
  };

  const calculate = () => {
    const score = Object.values(checked).reduce((a, b) => a + b, 0);
    const interp = getInterp(calc.interpret, score);
    setResult({ score, interp });
  };

  return (
    <div>
      {calc.items.map((item, i) => (
        <div
          key={i}
          onClick={() => toggle(i)}
          className={`flex justify-between items-center p-3 mb-2 rounded-xl border cursor-pointer transition ${
            checked[i]
              ? "bg-blue-50 border-blue-300 text-blue-800"
              : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"
          }`}
        >
          <span className="text-sm">{item.label}</span>
          <span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}
      <button
        onClick={calculate}
        className="w-full mt-4 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white">
          <div className="text-4xl font-bold text-gray-800">{result.score} puan</div>
          <div className={`mt-3 p-3 rounded-lg text-sm ${riskStyle[result.interp.cls]}`}>
            {result.interp.text}
          </div>
        </div>
      )}
    </div>
  );
}

function GksCalc({ calc }) {
  const [vals, setVals] = useState({ goz: 4, verbal: 5, motor: 6 });
  const [result, setResult] = useState(null);

  const opts = {
    goz: [["Spontan", 4], ["Sese", 3], ["Ağrıya", 2], ["Yok", 1]],
    verbal: [["Oryante", 5], ["Konfüze", 4], ["Uygunsuz", 3], ["Anlaşılmaz", 2], ["Yok", 1]],
    motor: [["Emirlere uyar", 6], ["Lokalize eder", 5], ["Çeker", 4], ["Fleksiyon", 3], ["Ekstansiyon", 2], ["Yok", 1]],
  };

  const labels = { goz: "Göz açma (E)", verbal: "Sözel yanıt (V)", motor: "Motor yanıt (M)" };

  const calculate = () => {
    const score = vals.goz + vals.verbal + vals.motor;
    const interp = getInterp(calc.interpret, score);
    setResult({ score, interp });
  };

  return (
    <div>
      {Object.entries(opts).map(([key, options]) => (
        <div key={key} className="mb-4">
          <label className="text-sm text-gray-500 mb-2 block">{labels[key]}</label>
          <div className="flex flex-wrap gap-2">
            {options.map(([label, val]) => (
              <button
                key={val}
                onClick={() => { setVals((p) => ({ ...p, [key]: val })); setResult(null); }}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  vals[key] === val
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {label} ({val})
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={calculate}
        className="w-full mt-2 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white">
          <div className="text-4xl font-bold text-gray-800">{result.score} / 15</div>
          <div className="text-sm text-gray-400 mt-1">E{vals.goz} + V{vals.verbal} + M{vals.motor}</div>
          <div className={`mt-3 p-3 rounded-lg text-sm ${riskStyle[result.interp.cls]}`}>
            {result.interp.text}
          </div>
        </div>
      )}
    </div>
  );
}

function BmiCalc({ calc }) {
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(boy);
    const k = parseFloat(kilo);
    if (!b || !k) return;
    const bmi = k / ((b / 100) ** 2);
    const interp = getInterp(calc.interpret, bmi);
    setResult({ bmi, interp });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-1 block">Boy (cm)</label>
        <input
          type="number"
          value={boy}
          onChange={(e) => { setBoy(e.target.value); setResult(null); }}
          placeholder="örn. 175"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-1 block">Kilo (kg)</label>
        <input
          type="number"
          value={kilo}
          onChange={(e) => { setKilo(e.target.value); setResult(null); }}
          placeholder="örn. 70"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <button
        onClick={calculate}
        className="w-full py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white">
          <div className="text-4xl font-bold text-gray-800">{result.bmi.toFixed(1)} kg/m²</div>
          <div className={`mt-3 p-3 rounded-lg text-sm ${riskStyle[result.interp.cls]}`}>
            {result.interp.text}
          </div>
        </div>
      )}
    </div>
  );
}

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
    genel: "bg-teal-50 text-teal-700",
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 text-sm mb-5 hover:underline flex items-center gap-1"
      >
        ← Ana sayfa
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColors[calc.category]}`}>
          {calc.category}
        </span>
        <h1 className="text-xl font-bold text-gray-800 mt-2">{calc.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{calc.description}</p>
        <button
          onClick={() => toggleFavorite(calc.id)}
          className="mt-3 flex items-center gap-1.5 text-sm text-gray-400 hover:text-yellow-500 transition"
        >
          {isFavorite(calc.id) ? "⭐ Favorilerden çıkar" : "☆ Favorilere ekle"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {calc.type === "checklist" && <ChecklistCalc calc={calc} />}
        {calc.type === "gks" && <GksCalc calc={calc} />}
        {calc.type === "bmi" && <BmiCalc calc={calc} />}
      </div>
    </div>
  );
}