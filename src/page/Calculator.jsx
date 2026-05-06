import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { calculators } from "../data/calculators";
import { useFavorites } from "../hooks/useFavorites";

const riskStyle = {
  low: "bg-green-50 text-green-800 border border-green-200",
  mid: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  high: "bg-red-50 text-red-800 border border-red-200",
};

const bgStyle = {
  red: "bg-red-50 border-red-100",
  yellow: "bg-yellow-50 border-yellow-100",
  green: "bg-green-50 border-green-100"
};

const textStyle = {
  red: "text-red-800",
  yellow: "text-yellow-800",
  green: "text-green-800"
};

function getInterp(interpret, score) {
  if (typeof score === "string") return { text: "Bazı değerler test edilemez olarak işaretlendi.", cls: "mid" };
  return interpret.find((i) => score <= i.max) || interpret[interpret.length - 1];
}

// 1. CHA2DS2 BİLEŞENİ (Artık verileri JS'den çekiyor)
function Cha2ds2Calc({ calc }) {
  const [checked, setChecked] = useState({});
  const [age, setAge] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("sonraki");

  const toggle = (i) => {
    setChecked((prev) => {
      const next = { ...prev };
      next[i] ? delete next[i] : (next[i] = calc.items[i].pts);
      return next;
    });
    setResult(null);
  };

  const calculate = () => {
    if (age === null) {
      alert("Lütfen yaş aralığını seçin.");
      return;
    }
    const score = Object.values(checked).reduce((a, b) => a + b, 0) + age;
    const interp = getInterp(calc.interpret, score);
    setResult({ score, interp });
  };

  return (
    <div className="text-left">
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-2 block font-medium">Yaş Aralığı</label>
        <div className="flex gap-2">
          {calc.ageOptions?.map((opt) => (
            <button
              key={opt.pts}
              onClick={() => { setAge(opt.pts); setResult(null); }}
              className={`flex-1 py-3 rounded-xl text-sm border transition ${
                age === opt.pts ? "bg-blue-50 border-blue-300 text-blue-800 font-bold" : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"
              }`}
            >
              {opt.label} <span className="block text-xs mt-0.5 opacity-70">+{opt.pts}</span>
            </button>
          ))}
        </div>
      </div>

      {calc.items.map((item, i) => (
        <div key={i} onClick={() => toggle(i)} className={`flex justify-between items-center p-4 mb-2 rounded-xl border cursor-pointer transition ${checked[i] ? "bg-blue-50 border-blue-300 text-blue-800 font-bold" : "bg-white border-gray-200 hover:border-blue-200"}`}>
          <span className="text-sm">{item.label}</span>
          <span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}

      <button onClick={calculate} className="w-full mt-4 py-4 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition shadow-sm">
        Hesapla
      </button>

      {result && calc.details && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-lg mb-5 text-center">
            <div className="text-5xl font-black text-gray-800 mb-1">{result.score}</div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Toplam Puan</div>
            <div className={`p-3 rounded-lg text-sm font-bold ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>

          <div className="flex gap-2 mb-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
            {[
              { id: "sonraki", label: "Sonraki Adımlar" },
              { id: "kanit", label: "Kanıt" },
              { id: "icerik", label: "İçerik Oluşturucusu" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${activeTab === tab.id ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "sonraki" && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50">
                <h3 className="font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">TAVSİYE</h3>
                {calc.details.nextSteps.advice.map((adv, idx) => (
                  <p key={idx} className={`text-blue-800 text-sm leading-relaxed ${idx === 0 ? "mb-2" : "font-semibold"}`}>{adv}</p>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">YÖNETMEK</h3>
                <div className="space-y-3">
                  {calc.details.nextSteps.management.map((mngt, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${bgStyle[mngt.cls]}`}>
                      <div className={`font-bold mb-1 ${textStyle[mngt.cls]}`}>{mngt.score}</div>
                      <div className={`text-sm leading-relaxed ${textStyle[mngt.cls].replace('800', '700')}`}>{mngt.text}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 italic">{calc.details.nextSteps.footer}</div>
              </div>
            </div>
          )}

          {activeTab === "kanit" && (
            <div className="space-y-6 animate-fade-in text-sm text-gray-700 text-left">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">FORMÜL</h3>
                <p className="leading-relaxed mb-3">{calc.details.evidence.formulaText}</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
                      <tr><th className="py-2 px-3 font-semibold">Değişken</th><th className="py-2 px-3 font-semibold text-right">Puanlar</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800 align-top">Yaş</td>
                        <td className="py-2 px-3 text-right text-gray-600 leading-relaxed">
                          {calc.ageOptions.map(opt => <div key={opt.pts}>{opt.label}: <span className="font-bold text-gray-800">{opt.pts}</span></div>)}
                        </td>
                      </tr>
                      {calc.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-2 px-3 font-medium text-gray-800">{item.label}</td>
                          <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800">0</span> / Evet <span className="font-bold text-gray-800">{item.pts}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr>
                        <th className="py-2 px-3 font-semibold text-center w-16">Puan</th>
                        <th className="py-2 px-3 font-semibold text-center">İnme Oranı<br/><span className="font-normal opacity-70">(100 Hasta Yılı)</span></th>
                        <th className="py-2 px-3 font-semibold">Tavsiye</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calc.details.evidence.stats.map((stat, idx) => (
                        <tr key={idx}>
                          <td className="py-2 px-3 font-bold text-center">{stat.pts}</td>
                          <td className="py-2 px-3 text-center">{stat.rate}</td>
                          {stat.rec && <td className={`py-2 px-3 font-bold ${stat.color}`} rowSpan={stat.rowspan || 1} style={stat.rowspan ? {verticalAlign: 'top', paddingTop:'12px'} : {}}>{stat.rec}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Edebiyat</h3>
                <div className="space-y-4">
                  {calc.details.evidence.literature.map((lit, idx) => (
                    <div key={idx}>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{lit.type}</div>
                      <a href={lit.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline text-sm leading-relaxed block">{lit.title}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "icerik" && (
            <div className="animate-fade-in text-sm text-gray-700 border border-gray-100 p-5 rounded-xl bg-gray-50 text-left">
              <h3 className="font-black text-lg text-gray-900 mb-1">{calc.details.creator.name}</h3>
              <p className="text-gray-500 text-xs font-bold uppercase mb-3">{calc.details.creator.title}</p>
              <p className="leading-relaxed mb-4">{calc.details.creator.bio}</p>
              <a href={calc.details.creator.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold text-xs">{calc.details.creator.linkText}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 2. GKS BİLEŞENİ
function GksCalc({ calc }) {
  const [vals, setVals] = useState({ goz: 4, verbal: 5, motor: 6 });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const isNT = Object.values(vals).some((v) => v === "NT");
    if (isNT) {
      setResult({ score: "NT", detail: `E${vals.goz} V${vals.verbal} M${vals.motor}` });
    } else {
      const score = vals.goz + vals.verbal + vals.motor;
      const interp = getInterp(calc.interpret, score);
      setResult({ score, detail: `E${vals.goz} V${vals.verbal} M${vals.motor}`, interp });
    }
  };

  return (
    <div className="text-left">
      {calc.sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 className="font-bold text-gray-800 text-lg mb-1">{section.title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-4">{section.info}</p>
          <div className="space-y-2">
            {section.options.map((opt) => (
              <button
                key={opt.pts}
                onClick={() => { setVals((p) => ({ ...p, [section.id]: opt.pts })); setResult(null); }}
                className={`w-full py-3.5 px-4 rounded-xl border text-sm transition-all duration-200 text-center ${
                  vals[section.id] === opt.pts ? "bg-blue-50 border-blue-400 text-blue-800 font-bold shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {opt.label} <span className="opacity-60 ml-1">({opt.pts === "NT" ? "NT" : `+${opt.pts}`})</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={calculate} className="w-full mt-4 py-4 bg-blue-700 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition shadow-lg">Hesapla</button>
      {result && (
        <div className="mt-8 p-6 rounded-2xl border border-gray-100 bg-white shadow-xl text-center animate-fade-in">
          <div className="text-6xl font-black text-gray-800 mb-2">{result.score === "NT" ? "NT" : result.score}</div>
          <div className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">{result.detail}</div>
          {result.interp && <div className={`p-4 rounded-xl text-sm font-bold ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>}
          {result.score === "NT" && <div className="p-4 rounded-xl text-sm font-bold bg-gray-50 text-gray-600 border border-gray-200 mt-2">Bazı bileşenler test edilemez (NT) olarak işaretlendi.</div>}
        </div>
      )}
    </div>
  );
}

// 3. CHECKLIST VE BMI BİLEŞENLERİ
function ChecklistCalc({ calc }) {
  const [checked, setChecked] = useState({});
  const [result, setResult] = useState(null);
  const toggle = (i) => { setChecked((p) => { const n = { ...p }; n[i] ? delete n[i] : (n[i] = calc.items[i].pts); return n; }); setResult(null); };
  const calculate = () => {
    const score = Object.values(checked).reduce((a, b) => a + b, 0);
    setResult({ score, interp: getInterp(calc.interpret, score) });
  };
  return (
    <div className="text-left">
      {calc.items.map((item, i) => (
        <div key={i} onClick={() => toggle(i)} className={`flex justify-between items-center p-4 mb-2 rounded-xl border cursor-pointer transition ${checked[i] ? "bg-blue-50 border-blue-300 text-blue-800 font-bold" : "bg-white border-gray-200"}`}>
          <span className="text-sm">{item.label}</span>
          <span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}
      <button onClick={calculate} className="w-full mt-4 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm">Hesapla</button>
      {result && <div className="mt-4 p-6 rounded-xl border border-gray-100 bg-white text-center shadow-lg"><div className="text-5xl font-black text-gray-800 mb-2">{result.score}</div><div className={`p-3 rounded-lg text-sm font-bold ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div></div>}
    </div>
  );
}

function BmiCalc({ calc }) {
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const b = parseFloat(boy) / 100;
    const k = parseFloat(kilo);
    if (!b || !k) return;
    const bmi = k / (b * b);
    setResult({ bmi, interp: getInterp(calc.interpret, bmi) });
  };
  return (
    <div className="text-left">
      <div className="mb-4"><label className="text-sm text-gray-500 mb-1 block font-bold">Boy (cm)</label><input type="number" value={boy} onChange={(e) => setBoy(e.target.value)} placeholder="örn. 175" className="w-full border border-gray-200 rounded-xl px-4 py-3" /></div>
      <div className="mb-5"><label className="text-sm text-gray-500 mb-1 block font-bold">Kilo (kg)</label><input type="number" value={kilo} onChange={(e) => setKilo(e.target.value)} placeholder="örn. 70" className="w-full border border-gray-200 rounded-xl px-4 py-3" /></div>
      <button onClick={calculate} className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm">Hesapla</button>
      {result && <div className="mt-4 p-6 rounded-xl border border-gray-100 bg-white text-center shadow-lg"><div className="text-5xl font-black text-gray-800 mb-1">{result.bmi.toFixed(1)}</div><div className={`p-3 rounded-lg text-sm font-bold ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div></div>}
    </div>
  );
}

// ANA EKRAN BİLEŞENİ
export default function Calculator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const calc = calculators.find((c) => c.id === id);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!calc) return <div className="p-6 text-center text-gray-500 font-bold">Hesaplayıcı bulunamadı.</div>;

  const catColors = {
    kardiyoloji: "bg-red-50 text-red-700",
    acil: "bg-orange-50 text-orange-700",
    noroloji: "bg-purple-50 text-purple-700",
    genel: "bg-teal-50 text-teal-700",
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-12">
      <button onClick={() => navigate("/")} className="text-blue-600 text-sm mb-5 hover:underline flex items-center gap-1 font-bold">← Ana sayfa</button>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 shadow-sm text-left">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${catColors[calc.category]}`}>{calc.category}</span>
        <h1 className="text-2xl font-black text-gray-800 mt-4 leading-tight">{calc.name}</h1>
        <p className="text-gray-500 text-sm mt-2 font-medium">{calc.description}</p>
        <button onClick={() => toggleFavorite(calc.id)} className="mt-5 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-yellow-500 transition-colors">
          {isFavorite(calc.id) ? "⭐ Favorilerden çıkar" : "☆ Favorilere ekle"}
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {calc.type === "cha2ds2" && <Cha2ds2Calc calc={calc} />}
        {calc.type === "checklist" && <ChecklistCalc calc={calc} />}
        {calc.type === "gks" && <GksCalc calc={calc} />}
        {calc.type === "bmi" && <BmiCalc calc={calc} />}
      </div>
    </div>
  );
} 