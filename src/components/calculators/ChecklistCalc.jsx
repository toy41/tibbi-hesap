import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

export default function ChecklistCalc({ calc }) {
  const [checked, setChecked] = useState({});
  const [result, setResult] = useState(null);

  const toggle = (i) => {
    setChecked((p) => { const n = { ...p }; n[i] ? delete n[i] : (n[i] = calc.items[i].pts); return n; });
    setResult(null);
  };

  const calculate = () => {
    const score = Object.values(checked).reduce((a, b) => a + b, 0);
    setResult({ score, interp: getInterp(calc.interpret, score) });
  };

  return (
    <div className="text-left">
      {calc.items?.map((item, i) => (
        <div key={i} onClick={() => toggle(i)} className={`flex justify-between items-center p-3 mb-2 rounded-xl border cursor-pointer transition ${checked[i] ? "bg-blue-50 border-blue-300 text-blue-800 font-medium" : "bg-white border-gray-200 text-gray-700"}`}>
          <span className="text-sm">{item.label}</span><span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}
      <button onClick={calculate} className="w-full mt-4 py-3 bg-blue-700 text-white rounded-xl font-medium shadow-sm">Hesapla</button>
      
      {result && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-white text-center mb-5">
            <div className="text-5xl font-bold text-gray-800 mb-1">{result.score}</div>
            <div className="text-gray-400 text-sm font-medium uppercase mb-3">Toplam Puan</div>
            <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>
          <InfoTabs 
            data={calc.infoData} 
            customYonetim={
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 underline">Üç Katmanlı Model</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-green-50 border-green-100">
                        <div className="font-bold mb-1 text-green-800">Hastanın düşük riskli olduğu belirlendi (&lt;2 puan: %1,3 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-green-700 mb-2">Pulmoner emboliyi ekarte etmek için d-dimer testi düşünülebilir. Alternatif olarak, PERC gibi bir ekarte etme kriteri düşünülebilir.</div>
                        <ul className="list-disc ml-5 text-sm text-green-700"><li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li><li>Dimer pozitif ise CTA'yı değerlendirin.</li></ul>
                      </div>
                      <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-100">
                        <div className="font-bold mb-1 text-yellow-800">Hastanın orta riskli olduğu belirlendi (2-6 puan arası skor, %16,2 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-yellow-700 mb-2">Yüksek hassasiyetli d-dimer testi veya BT anjiyografisi düşünülmelidir.</div>
                        <ul className="list-disc ml-5 text-sm text-yellow-700"><li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li><li>Dimer pozitif ise CTA'yı değerlendirin.</li></ul>
                      </div>
                      <div className="p-3 rounded-lg border bg-red-50 border-red-100">
                        <div className="font-bold mb-1 text-red-800">Hastanın yüksek riskli olduğu belirlendi (skor &gt;6 puan: %37,5 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-red-700">BT anjiyografisi düşünülmelidir. D-dimer testi önerilmemektedir.</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-2 underline">İki Katmanlı Model</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-green-50 border-green-100">
                        <div className="font-bold mb-1 text-green-800">Hastanın riski "PE olasılığı düşük" olarak belirlenmiştir (0-4 puan, %12,1 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-green-700 mb-2">Yüksek hassasiyetli d-dimer testi düşünülmelidir.</div>
                        <ul className="list-disc ml-5 text-sm text-green-700"><li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li><li>Dimer pozitif ise CTA'yı değerlendirin.</li></ul>
                      </div>
                      <div className="p-3 rounded-lg border bg-red-50 border-red-100">
                        <div className="font-bold mb-1 text-red-800">Hastanın riski "PE olasılığı yüksek" olarak belirlenmiştir (&gt;4 puan, %37,1 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-red-700">BT anjiyografi (CTA) testi düşünülmelidir.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                  <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 leading-relaxed font-normal">
                    <li>Yeni nesil d-dimer'in yüksek duyarlılığı ancak düşük özgüllüğü (yaklaşık %50) göz önüne alındığında, yüksek riskli kabul edilen hastaların BT anjiyografi ile değerlendirilmesi gerekmektedir.</li>
                    <li>Özellikle durumu stabil olmayan hastalarda, canlandırma çabalarını asla tanı testleri için geciktirmeyin.</li>
                    <li>Tanı testlerinden önce mutlaka anamnez ve muayene yapılmalıdır.</li>
                  </ul>
                </div>
              </div>
            }
            customKanit={
              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <p className="text-sm font-semibold text-gray-800 mb-3">Puan Yorumlama:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 py-2.5 px-3 border-b border-gray-200 font-bold text-xs text-gray-700 uppercase">Üç Katmanlı Model</div>
                    <table className="w-full text-left bg-white text-xs">
                      <thead className="bg-white border-b border-gray-200 text-gray-500">
                        <tr><th className="py-2.5 px-3 font-semibold w-24">Skor</th><th className="py-2.5 px-3 font-semibold">Risk Kategorisi</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {calc.infoData.statsThreeTier.map((s, i) => (
                          <tr key={i}><td className="py-2.5 px-3 font-bold text-gray-900">{s.pts}</td><td className="py-2.5 px-3 text-gray-600">{s.risk}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 py-2.5 px-3 border-b border-gray-200 font-bold text-xs text-gray-700 uppercase">İki Katmanlı Model</div>
                    <table className="w-full text-left bg-white text-xs">
                      <thead className="bg-white border-b border-gray-200 text-gray-500">
                        <tr><th className="py-2.5 px-3 font-semibold w-24">Skor</th><th className="py-2.5 px-3 font-semibold">Risk Kategorisi</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {calc.infoData.statsTwoTier.map((s, i) => (
                          <tr key={i}><td className="py-2.5 px-3 font-bold text-gray-900">{s.pts}</td><td className="py-2.5 px-3 text-gray-600">{s.risk}</td></tr>
                        ))}
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