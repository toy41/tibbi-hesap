import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

export default function ApgarCalc({ calc }) {
  const [answers, setAnswers] = useState(() => Array(calc.items.length).fill(null));
  const [result, setResult] = useState(null);

  const setAnswer = (questionIndex, pts) => {
    setAnswers((prev) => { const next = [...prev]; next[questionIndex] = pts; return next; });
    setResult(null);
  };

  const calculate = () => {
    if (answers.some((answer) => answer === null)) { alert("Lütfen tüm alanları doldurun."); return; }
    const score = answers.reduce((sum, value) => sum + value, 0);
    const interp = getInterp(calc.interpret, score);
    setResult({ score, interp });
  };

  return (
    <div className="text-left">
      <div className="space-y-4">
        {calc.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl bg-white p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
            <div className="text-sm font-semibold text-gray-800 md:w-1/3">{item.label}</div>
            <div className="flex flex-col gap-2 md:w-2/3">
              {item.options.map((option) => (
                <button 
                  key={option.pts} 
                  onClick={() => setAnswer(index, option.pts)} 
                  className={`rounded-lg border px-4 py-2.5 text-left text-sm transition flex justify-between items-center ${
                    answers[index] === option.pts 
                      ? "bg-blue-50 border-blue-300 text-blue-800 font-semibold shadow-sm" 
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-200"
                  }`}
                >
                  <span className="leading-snug">{option.label}</span>
                  <span className={`text-xs font-bold whitespace-nowrap ml-2 ${answers[index] === option.pts ? "text-blue-700" : "text-gray-400"}`}>+{option.pts}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={calculate} className="w-full mt-5 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm hover:bg-blue-800 transition">Hesapla</button>

      {result && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm text-center">
            <div className="text-6xl font-bold text-gray-800 mb-2">{result.score}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">APGAR Skoru</div>
            <div className={`p-4 rounded-xl text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>
          
          <InfoTabs 
            data={calc.infoData}
            customYonetim={
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  <div className="space-y-3">
                    {calc.infoData.yonetim.map((y, i) => (
                      <div key={i} className={`p-3 rounded-lg border ${y.cls}`}>
                        <div className="font-bold mb-1">{y.score}</div>
                        <div className="text-sm leading-relaxed opacity-90">{y.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {calc.infoData.kritikMaddeler && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                    <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 leading-relaxed">
                      {calc.infoData.kritikMaddeler.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            }
            customKanit={
              <div className="space-y-6">
                {/* 1. GERÇEKLER VE RAKAMLAR TABLOSU */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                  <p className="text-sm font-semibold text-gray-800 mb-3">Puan Yorumlama:</p>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-left bg-white text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr><th className="py-2.5 px-3 font-semibold w-24">Skor</th><th className="py-2.5 px-3 font-semibold">Durum / Anlamı</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="py-2.5 px-3 font-bold text-gray-900">≥ 7</td><td className="py-2.5 px-3 text-green-700 font-medium">Genellikle normal</td></tr>
                        <tr><td className="py-2.5 px-3 font-bold text-gray-900">4 - 6</td><td className="py-2.5 px-3 text-yellow-700 font-medium">Oldukça düşük</td></tr>
                        <tr><td className="py-2.5 px-3 font-bold text-gray-900">≤ 3</td><td className="py-2.5 px-3 text-red-700 font-medium">Kritik derecede düşük, müdahale gerektirir</td></tr>
                      </tbody>
                    </table> 
                  </div>   
                </div>
              </div>
            } 
          />  
        </div>
      )}
    </div>
  );
}
          
                  
            
  
  