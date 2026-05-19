import { useState } from "react";
import InfoTabs from "../InfoTabs";

export default function QTCcalc({ calc }) {
  const [formula, setFormula] = useState("bazett");
  const [hr, setHr] = useState("");
  const [paperSpeed, setPaperSpeed] = useState(25); // YENİ EKLENDİ: Kağıt Hızı (25 veya 50)
  const [qtValue, setQtValue] = useState("");
  const [unit, setUnit] = useState("ms"); // ms veya box
  const [result, setResult] = useState(null);

  const calculate = () => {
    const nabiz = parseFloat(hr);
    let qtMs = parseFloat(qtValue);

    if (!nabiz || !qtMs) return;

    // YENİ EKLENDİ: Eğer birim 'box' (küçük kutu) ise kağıt hızına göre milisaniyeye çevir
    if (unit === "box") {
      qtMs = paperSpeed === 25 ? qtMs * 40 : qtMs * 20;
    }

    const qtSec = qtMs / 1000;
    const rrSec = 60 / nabiz;
    let qtc = 0;

    switch (formula) {
      case "bazett":
        qtc = qtMs / Math.sqrt(rrSec);
        break;
      case "fridericia":
        qtc = qtMs / Math.pow(rrSec, 1/3);
        break;
      case "framingham":
        qtc = qtMs + 154 * (1 - rrSec);
        break;
      case "hodges":
        qtc = qtMs + 1.75 * (nabiz - 60);
        break;
      default:
        qtc = qtMs / Math.sqrt(rrSec);
    }

    setResult(qtc.toFixed(0));
  };

  return (
    <div className="text-left">
      <div className="space-y-5">
        {/* Formül Seçimi */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Kullanılacak Formül</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["bazett", "fridericia", "framingham", "hodges"].map((f) => (
              <button
                key={f}
                onClick={() => { setFormula(f); setResult(null); }}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold uppercase transition-all ${
                  formula === f ? "bg-teal-700 border-teal-700 text-white shadow-sm" : "bg-white border-gray-200 text-gray-600 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Kalp Hızı */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <label className="text-sm font-semibold text-gray-800 md:w-1/2">Kalp atış hızı/nabız</label>
          <div className="md:w-1/2">
            <input
              type="number"
              value={hr}
              onChange={(e) => { setHr(e.target.value); setResult(null); }}
              placeholder="Örn: 75"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 transition"
            />
          </div>
        </div>

        {/* YENİ EKLENDİ: Kağıt Hızı */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <label className="text-sm font-semibold text-gray-800 md:w-1/2">Kağıt hızı, mm/sn</label>
          <div className="md:w-1/2 flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
            <button
              onClick={() => { setPaperSpeed(25); setResult(null); }}
              className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                paperSpeed === 25 
                  ? "bg-[#168865] text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              25
            </button>
            <button
              onClick={() => { setPaperSpeed(50); setResult(null); }}
              className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                paperSpeed === 50 
                  ? "bg-[#168865] text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              50
            </button>
          </div>
        </div>

        {/* QT Aralığı ve Birim Değiştirme */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
            <label className="text-sm font-semibold text-gray-800">QT aralığı</label>
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
              <button 
                onClick={() => { setUnit("ms"); setResult(null); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${unit === "ms" ? "bg-white text-gray-800 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}
              >
                milisaniye (ms)
              </button>
              <button 
                onClick={() => { setUnit("box"); setResult(null); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${unit === "box" ? "bg-white text-gray-800 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}
              >
                küçük kutu
              </button>
            </div>
          </div>
          <input
            type="number"
            value={qtValue}
            onChange={(e) => { setQtValue(e.target.value); setResult(null); }}
            placeholder={unit === "ms" ? "Örn: 400" : "Örn: 10"}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 transition"
          />
          
          <p className="mt-3 text-[12px] text-gray-600 leading-relaxed font-medium">
            Birim olarak milisaniye veya küçük kutular kullanmak için birimi değiştirin; 1 küçük kutu = <span className="font-bold text-teal-700">{paperSpeed === 25 ? "40" : "20"} milisaniye</span> (aşağıda QT aralığının 4 küçük kutuya eşit olduğu örneğe bakın)
          </p>
          
          {/* FOTOĞRAF ALANI */}
          <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white p-2">
            {/* DİKKAT: Projende public klasörünün içine "images" adında bir klasör açıp, gönderdiğin görseli "ekg-boxes.png" adıyla kaydedersen bu kod o görseli otomatik çekecektir. */}
            <img 
              src="/images/ekg-boxes.png" 
              alt="EKG Kutu Hesaplama" 
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </div>
      </div>

      <button onClick={calculate} className="w-full mt-6 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg shadow-sm hover:bg-blue-800 transition-all">Hesapla</button>

      {result && (
        <div className="mt-8 border-t border-gray-100 pt-6 animate-fade-in">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm text-center">
            <div className="text-6xl font-bold text-gray-800 mb-2">{result} <span className="text-2xl font-medium text-gray-400">ms</span></div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-5">Düzeltilmiş QTc ({formula})</div>
            
            <div className={`p-4 rounded-xl text-sm font-semibold inline-block min-w-[200px] ${
              result > 470 ? "bg-red-50 text-red-700 border border-red-100" : 
              result > 440 ? "bg-yellow-50 text-yellow-700 border border-yellow-100" : 
              "bg-green-50 text-green-700 border border-green-100"
            }`}>
              {result > 470 ? "Uzamış QTc" : result > 440 ? "Sınırda QTc" : "Normal QTc"}
            </div>
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
                        <div className="font-bold mb-1 text-sm">{y.score}</div>
                        <div className="text-sm leading-relaxed opacity-90">{y.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {calc.infoData.kritikMaddeler && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                    <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 leading-relaxed font-normal">
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
                {/* 1. FORMÜLLER */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Formüller</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-gray-800 font-medium font-mono">
                      {calc.infoData.kanitFormuller.map((f, i) => (
                        <li key={i} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 2. GERÇEKLER VE RAKAMLAR ANA BAŞLIĞI */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-wider text-sm">Gerçekler ve Rakamlar</h3>
                  
                  <div className="space-y-6">
                    {/* A. Uzun QT Sendromu */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 text-sm">Uzun QT Sendromu (LQTS):</h4>
                      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600 leading-relaxed">
                        {calc.infoData.uzunQtSendromu.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    {/* B. QT Uzamasının Nedenleri */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 text-sm">QT Uzamasının Bazı Nedenleri:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {calc.infoData.uzunQtNedenleri.map((neden, i) => (
                          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gray-50 py-2.5 px-3 border-b border-gray-200 font-bold text-xs text-gray-700 uppercase">{neden.kategori}</div>
                            <ul className="p-3 list-disc ml-4 space-y-1.5 text-xs text-gray-600 bg-white">
                              {neden.maddeler.map((m, idx) => (
                                <li key={idx}>{m}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* C. QT Nomogramı */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 text-sm">QT Nomogramı:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        Bu araç, torsades de pointes riski yüksek olan hastaları değerlendirmek içindir – buradaki QT aralığı mutlak / düzeltilmemiş QT aralığıdır. Parametreleri çizginin üzerinde olan hastalar torsades de pointes açısından yüksek risk altındadır:
                      </p>
                      
                      {/* GÖRSEL BURAYA EKLENDİ */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-2">
                        <img 
                          src="/images/qt-nomogram.png" 
                          alt="QT Nomogramı" 
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </div>
                    </div>

                    {/* D. Kısa QT Sendromu */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 text-sm">Kısa QT Sendromu (SQTS):</h4>
                      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600 leading-relaxed">
                        {calc.infoData.kisaQtSendromu.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
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