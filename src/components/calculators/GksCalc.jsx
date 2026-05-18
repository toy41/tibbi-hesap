import { useState } from "react";
import InfoTabs from "../InfoTabs";
import { getInterp, riskStyle } from "../../utils/helpers";

export default function GksCalc({ calc }) {
  const [vals, setVals] = useState({ goz: 4, verbal: 5, motor: 6 });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const isNT = Object.values(vals).some((v) => v === "NT");
    if (isNT) { setResult({ score: "NT", detail: `E${vals.goz} V${vals.verbal} M${vals.motor}` }); } 
    else {
      const score = vals.goz + vals.verbal + vals.motor;
      setResult({ score, detail: `E${vals.goz} V${vals.verbal} M${vals.motor}`, interp: getInterp(calc.interpret, score) });
    }
  };

  const sections = [
    { id: "goz", title: "En iyi göz tepkisi", info: "Yerel yaralanma, ödem veya başka bir nedenle değerlendirilemeyen durumlar için \"Test edilemez (NT)\" işaretini koyun.", options: [{ label: "Kendiliğinden", pts: 4 }, { label: "Sözlü komuta", pts: 3 }, { label: "Ağrıya", pts: 2 }, { label: "Göz açıcı değil", pts: 1 }, { label: "Test edilemez", pts: "NT" }] },
    { id: "verbal", title: "En iyi sözlü yanıt", info: "Entübe edilmişse veya başka bir nedenle değerlendirilemiyorsa, \"Test edilemez (NT)\" olarak işaretleyin.", options: [{ label: "Yönlendirilmiş", pts: 5 }, { label: "Kafası karışık", pts: 4 }, { label: "Uygunsuz kelimeler", pts: 3 }, { label: "Anlaşılmaz sesler", pts: 2 }, { label: "Sözlü yanıt yok", pts: 1 }, { label: "Test edilemez/entübe edilemez", pts: "NT" }] },
    { id: "motor", title: "En iyi motor yanıt", info: "Eğer değerlendirilemiyorsa (felç, alçı vb.), \"Test edilemez (NT)\" işaretleyin.", options: [{ label: "Emirlere uyar", pts: 6 }, { label: "Lokalize eder", pts: 5 }, { label: "Normal fleksiyon (Çeker)", pts: 4 }, { label: "Anormal fleksiyon", pts: 3 }, { label: "Ekstansiyon", pts: 2 }, { label: "Motor yanıt yok", pts: 1 }, { label: "Test edilemez", pts: "NT" }] }
  ];

  return (
    <div className="text-left">
      {sections.map((s) => (
        <div key={s.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div><h3 className="text-lg text-gray-800 mb-2">{s.title}</h3><p className="text-sm text-gray-500 leading-relaxed pr-0 md:pr-4">{s.info}</p></div>
          <div className="border border-gray-300 rounded-lg flex flex-col overflow-hidden shadow-sm bg-white">
            {s.options.map((opt) => (
              <button key={opt.pts} onClick={() => { setVals((p) => ({ ...p, [s.id]: opt.pts })); setResult(null); }} className={`w-full py-3.5 px-4 text-center text-sm transition-colors border-b border-gray-200 last:border-b-0 ${vals[s.id] === opt.pts ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-700 hover:bg-gray-50 font-medium"}`}>{opt.label} ({opt.pts === "NT" ? "NT" : `+${opt.pts}`})</button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={calculate} className="w-full mt-4 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm">Hesapla</button>
      
      {result && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm text-center mb-5">
            <div className="text-6xl font-bold text-gray-800 mb-2">{result.score}</div>
            <div className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">{result.detail}</div>
            {result.interp && <div className={`p-4 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>}
            {result.score === "NT" && <div className="p-3 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 border border-gray-200 mt-2">Bazı bileşenler test edilemez (NT) olarak işaretlendi.</div>}
          </div>
          <InfoTabs 
            data={calc.infoData}
            customYonetim={
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 leading-relaxed font-normal">
                    <li>Akut dönemde klinik yönetim kararları yalnızca GCS skoruna dayandırılmamalıdır.</li>
                    <li>Travma geçiren bir hastanın Glasgow Koma Ölçeği (GCS) değeri ≤8 ise ve muayene veya görüntüleme bulgularına dayanarak hastanın hava yolunu koruyamayacağına veya klinik seyrinin kötüleşmesinin beklendiğine dair klinik endişe varsa, entübasyon düşünülebilir.</li>
                    <li>Herhangi bir hastada, Glasgow Koma Ölçeği'nde (GCS) hızla düşüş veya dalgalanmalar endişe vericidir ve entübasyon, hastanın genel klinik tablosu bağlamında değerlendirilmelidir.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                  <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 leading-relaxed font-normal mb-4">
                    <li>GCS skoru yaygın olarak ve çeşitli ortamlarda benimsenmiş olsa da, nicel amaçlarla kullanılmak üzere tasarlanmamıştır.</li>
                    <li>Akut dönemde klinik yönetim kararları yalnızca GCS skoruna dayandırılmamalıdır.</li>
                  </ul>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal mb-1">GCS'nin yaratıcılarından:</p>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    “GCS’nin tek başına, ne komayı izlemek ne de beyin hasarının şiddetini değerlendirmek veya sonucu tahmin etmek için kullanılmasını hiçbir zaman önermedik.” (<a href="https://cdn.ps.emap.com/wp-content/uploads/sites/3/2014/10/141015Forty-years-on-updating-the-Glasgow-coma-scale.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Teasdale 2014</a>)
                  </p>
                </div>
              </div>
            }
            customKanit={
              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr><th className="py-2.5 px-3 font-semibold">Bileşen</th><th className="py-2.5 px-3 font-semibold">Cevap</th><th className="py-2.5 px-3 font-semibold text-center">Puanlar</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calc.infoData.stats.map((s, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-bold text-gray-900">{s.bileşen}</td>
                          <td className="py-2.5 px-3 text-gray-600">{s.cevap}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-gray-800">{s.puan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed italic">
                  *Aşağıdakilerden herhangi biri nedeniyle bazı bileşenler test edilemeyebilir (bu liste kapsamlı değildir):<br/>
                  Göz: Yerel yaralanma ve/veya ödem. Sözel: entübasyon. Tüm (göz, sözel, motor): sedasyon, paralizi ve ventilasyon yoluyla tüm tepkilerin ortadan kaldırılması.
                </p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}