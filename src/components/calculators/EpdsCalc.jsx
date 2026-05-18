import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

export default function EpdsCalc({ calc }) {
  const [answers, setAnswers] = useState(() => Array(calc.items.length).fill(null));
  const [result, setResult] = useState(null);

  const setAnswer = (questionIndex, pts) => {
    setAnswers((prev) => { const next = [...prev]; next[questionIndex] = pts; return next; });
    setResult(null);
  };

  const calculate = () => {
    if (answers.some((answer) => answer === null)) { alert("Lütfen tüm soruları yanıtlayın."); return; }
    const score = answers.reduce((sum, value) => sum + value, 0);
    const interp = getInterp(calc.interpret, score);
    setResult({ score, interp });
  };

  return (
    <div className="text-left">
      <div className="space-y-5">
        {calc.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-800 mb-3">{index + 1}. {item.label}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.options.map((option) => (
                <button key={option.pts} onClick={() => setAnswer(index, option.pts)} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${answers[index] === option.pts ? "bg-blue-50 border-blue-300 text-blue-800 font-semibold" : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"}`}>
                  <div>{option.label}</div><div className="text-xs text-gray-500 mt-1">+{option.pts}</div>
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
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">Toplam EPDS Puanı</div>
            <div className={`p-4 rounded-xl text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>
          
          <InfoTabs 
            data={calc.infoData} 
            customKanit={
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <p className="text-sm font-semibold text-gray-800 mb-3">Geçtiğimiz 7 gün içinde…</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Değişken</th>
                        <th className="py-2.5 px-3 font-semibold">Cevap</th>
                        <th className="py-2.5 px-3 font-semibold text-center w-20">Puanlar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calc.infoData.statsEpds.map((s, i) => (
                        <tr key={i} className={s.q ? "bg-gray-50/50" : ""}>
                          <td className="py-2.5 px-3 font-bold text-gray-900 leading-relaxed">{s.q}</td>
                          <td className="py-2.5 px-3 text-gray-600">{s.a}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-gray-800">{s.p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Kanıt Değerlendirmesi</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold w-32">EPDS Skoru</th>
                        <th className="py-2.5 px-3 font-semibold">Tarama Sonucu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calc.infoData.degerlendirmeEpds.map((d, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-bold text-gray-900">{d.score}</td>
                          <td className={`py-2.5 px-3 font-medium ${i === 0 ? "text-green-700" : "text-red-700"}`}>{d.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}