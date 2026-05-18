import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

const InputRow = ({ label, subLabel, value, onChange, unit, placeholder }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="mb-2 md:mb-0 md:mr-4 flex-1">
      <label className="text-gray-800 font-medium">{label}</label>
      {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
    </div>
    <div className="flex items-center w-full md:w-1/2 bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 outline-none text-gray-800" />
      <div className="bg-gray-50 px-4 py-2.5 border-l border-gray-300 text-sm text-gray-600 whitespace-nowrap min-w-[90px] text-center">{unit}</div>
    </div>
  </div>
);

export default function BmiCalc({ calc }) {
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [hedefBmi, setHedefBmi] = useState("25");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(boy);
    const k = parseFloat(kilo);
    const hb = parseFloat(hedefBmi);
    if (!b || !k) return;

    const hm = b / 100;
    const bmi = k / (hm * hm);
    const bsa = Math.sqrt((b * k) / 3600); 
    const targetW = hb ? (hb * hm * hm) : null;
    const interp = getInterp(calc.interpret, bmi);

    setResult({ bmi, bsa, targetW, hb, interp });
  };

  return (
    <div className="text-left">
      <div className="mb-6 border border-gray-200 rounded-xl px-4 py-1 bg-white shadow-sm">
        <InputRow label="Ağırlık" value={kilo} onChange={(val) => { setKilo(val); setResult(null); }} unit="kilogram" placeholder="örn. 70" />
        <InputRow label="Yükseklik" value={boy} onChange={(val) => { setBoy(val); setResult(null); }} unit="santimetre" placeholder="örn. 185" />
        <InputRow label="Hedef BMI" subLabel="İsteğe bağlı, hedef BMI'ye ulaşmak için gereken ağırlığı belirlemek için." value={hedefBmi} onChange={(val) => { setHedefBmi(val); setResult(null); }} unit="kg/m²" placeholder="25" />
      </div>

      <button onClick={calculate} className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm hover:bg-blue-800 transition">Hesapla</button>
      
      {result && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row bg-[#10704c] text-white mb-6">
            <div className="flex-1 p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/20">
              <div className="flex items-baseline gap-1 mb-2"><span className="text-4xl font-extrabold">{result.bmi.toFixed(1)}</span><span className="text-lg font-medium opacity-90">kg/m²</span></div>
              <div className="text-sm font-medium opacity-90 leading-relaxed">Vücut Kitle İndeksi ({result.interp.text.split('(')[0].trim()})</div>
            </div>
            <div className="flex-1 p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/20">
              <div className="flex items-baseline gap-1 mb-2"><span className="text-4xl font-extrabold">{result.bsa.toFixed(2)}</span><span className="text-lg font-medium opacity-90">m²</span></div>
              <div className="text-sm font-medium opacity-90 leading-relaxed">Vücut Yüzey Alanı</div>
            </div>
            {result.targetW && (
              <div className="flex-1 p-5 md:p-6">
                <div className="flex items-baseline gap-1 mb-2"><span className="text-4xl font-extrabold">{result.targetW.toFixed(0)}</span><span className="text-lg font-medium opacity-90">kilogram</span></div>
                <div className="text-sm font-medium opacity-90 leading-relaxed">Vücut Kitle İndeksi (BMI) {result.hb} kg/m² olan kişiler için hedef kilo</div>
              </div>
            )}
          </div>
          <InfoTabs 
            data={calc.infoData}
            customYonetim={
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">{calc.infoData.yonetimMetni}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    {calc.infoData.kritikMetni}
                    <a href={calc.infoData.kritikLink.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">{calc.infoData.kritikLink.text}</a>
                    {calc.infoData.kritikMetniSon}
                  </p>
                </div>
              </div>
            }
            customKanit={
              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600"><tr><th className="py-2.5 px-3 font-semibold">BMI, kg/m²</th><th className="py-2.5 px-3 font-semibold">Ağırlık Durumu</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {calc.infoData.statsBmi.map((s, i) => (
                        <tr key={i}><td className="py-2.5 px-3 font-bold text-gray-900 w-32">{s.bmi}</td><td className="py-2.5 px-3 text-gray-600">{s.weight}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed italic">{calc.infoData.dipnot}</p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}