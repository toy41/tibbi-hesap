import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

export default function Cha2ds2Calc({ calc }) {
  const [checked, setChecked] = useState({});
  const [age, setAge] = useState(null);
  const [result, setResult] = useState(null);

  const toggle = (i) => {
    setChecked((prev) => { const next = { ...prev }; next[i] ? delete next[i] : (next[i] = calc.items[i].pts); return next; });
    setResult(null);
  };

  const calculate = () => {
    if (age === null) { alert("Lütfen yaş aralığını seçin."); return; }
    const score = Object.values(checked).reduce((a, b) => a + b, 0) + age;
    setResult({ score, interp: getInterp(calc.interpret, score) });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-2 block font-medium">Yaş Aralığı</label>
        <div className="flex gap-2">
          {[ { label: "< 65", pts: 0 }, { label: "65-74", pts: 1 }, { label: "≥ 75", pts: 2 } ].map((opt) => (
            <button key={opt.pts} onClick={() => { setAge(opt.pts); setResult(null); }} className={`flex-1 py-2 rounded-xl text-sm border transition ${age === opt.pts ? "bg-blue-50 border-blue-300 text-blue-800 font-medium" : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"}`}>
              {opt.label} <span className="block text-xs mt-0.5 opacity-70">+{opt.pts}</span>
            </button>
          ))}
        </div>
      </div>
      {calc.items.map((item, i) => (
        <div key={i} onClick={() => toggle(i)} className={`flex justify-between items-center p-3 mb-2 rounded-xl border cursor-pointer transition ${checked[i] ? "bg-blue-50 border-blue-300 text-blue-800 font-medium" : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"}`}>
          <span className="text-sm">{item.label}</span><span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}
      <button onClick={calculate} className="w-full mt-4 py-3 bg-blue-700 text-white rounded-xl font-medium shadow-sm hover:bg-blue-800">Hesapla</button>
      {result && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm mb-5 text-center">
            <div className="text-5xl font-bold text-gray-800 mb-1">{result.score}</div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Toplam Puan</div>
            <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>
          <InfoTabs data={calc.infoData} />
        </div>
      )}
    </div>
  );
}