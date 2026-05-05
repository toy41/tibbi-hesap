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

// CHA2DS2 BİLEŞENİ
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
    <div>
      {/* ÖZEL YAŞ SEÇİMİ */}
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-2 block font-medium">Yaş Aralığı</label>
        <div className="flex gap-2">
          {[
            { label: "< 65", pts: 0 },
            { label: "65-74", pts: 1 },
            { label: "≥ 75", pts: 2 },
          ].map((opt) => (
            <button
              key={opt.pts}
              onClick={() => { setAge(opt.pts); setResult(null); }}
              className={`flex-1 py-2 rounded-xl text-sm border transition ${
                age === opt.pts
                  ? "bg-blue-50 border-blue-300 text-blue-800 font-medium"
                  : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"
              }`}
            >
              {opt.label}
              <span className="block text-xs mt-0.5 opacity-70">+{opt.pts}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DİĞER MADDELER */}
      {calc.items.map((item, i) => (
        <div
          key={i}
          onClick={() => toggle(i)}
          className={`flex justify-between items-center p-3 mb-2 rounded-xl border cursor-pointer transition ${
            checked[i]
              ? "bg-blue-50 border-blue-300 text-blue-800 font-medium"
              : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"
          }`}
        >
          <span className="text-sm">{item.label}</span>
          <span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}

      <button
        onClick={calculate}
        className="w-full mt-4 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition shadow-sm"
      >
        Hesapla
      </button>

      {/* SONUÇ VE SEKMELER ALANI */}
      {result && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm mb-5 text-center">
            <div className="text-5xl font-bold text-gray-800 mb-1">{result.score}</div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Toplam Puan</div>
            <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>
              {result.interp.text}
            </div>
          </div>

          {/* Sekme Butonları */}
          <div className="flex gap-2 mb-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
            {[
              { id: "sonraki", label: "Sonraki Adımlar" },
              { id: "kanit", label: "Kanıt" },
              { id: "icerik", label: "İçerik Oluşturucusu" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SEKME 1: SONRAKİ ADIMLAR */}
          {activeTab === "sonraki" && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50">
                <h3 className="font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">TAVSİYE</h3>
                <p className="text-blue-800 text-sm leading-relaxed mb-2">
                  Bu aracın sonuçlarını, kapsamlı değerlendirme, klinik yargı, uzman önerileri ve hasta tercihiyle birlikte, atriyal fibrilasyonda tromboembolik riskin yönetimine rehberlik etmek için kullanın.
                </p>
                <p className="text-blue-800 text-sm leading-relaxed font-semibold">
                  Felç riskini periyodik aralıklarla yeniden değerlendirin.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">YÖNETMEK</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50">
                    <div className="font-bold text-red-800 mb-1">2 veya daha yüksek puan:</div>
                    <div className="text-red-700 text-sm leading-relaxed">
                      Felç riskini azaltmak için oral antikoagülan tedavi önerilir.<br/>
                      <span className="mt-1 inline-block">Kanama riskini değerlendirmek için bir kanama riski skorlama sistemi (örneğin, <strong>ATRIA, DOAC, HAS-BLED, HEMORR₂HAGES, ORBIT</strong>) kullanmayı düşünün.</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-yellow-100 bg-yellow-50">
                    <div className="font-bold text-yellow-800 mb-1">1 puan:</div>
                    <div className="text-yellow-700 text-sm leading-relaxed">
                      Antikoagülasyonun risklerini ve faydalarını değerlendirmek için klinik yargınızı kullanın.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-green-100 bg-green-50">
                    <div className="font-bold text-green-800 mb-1">0 puan:</div>
                    <div className="text-green-700 text-sm leading-relaxed">
                      Antikoagülasyon önerilmez.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 italic">
                  Ek öneriler için lütfen ESC'nin AF yönetimiyle ilgili kılavuzlarına bakın.
                </div>
              </div>
            </div>
          )}

          {/* SEKME 2: KANIT */}
          {activeTab === "kanit" && (
            <div className="space-y-6 animate-fade-in text-sm text-gray-700 text-left">
              
              {/* Formül */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">FORMÜL</h3>
                <p className="leading-relaxed mb-3">
                  CHA₂DS₂-VA Skoru, her bir değişken için seçilen puanların toplanmasıyla belirlenir:
                </p>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Değişken</th>
                        <th className="py-2 px-3 font-semibold text-right">Puanlar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800 align-top">Yaş</td>
                        <td className="py-2 px-3 text-right text-gray-600 leading-relaxed">
                          &lt;65: <span className="font-bold text-gray-800">0</span><br/>
                          65-74: <span className="font-bold text-gray-800">1</span><br/>
                          ≥75: <span className="font-bold text-gray-800">2</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800">Kronik kalp yetmezliği</td>
                        <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800 ml-1">0</span> / Evet <span className="font-bold text-gray-800 ml-1">1</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800">Hipertansiyon</td>
                        <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800 ml-1">0</span> / Evet <span className="font-bold text-gray-800 ml-1">1</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800">Daha önce geçirilmiş inme, geçici iskemik atak veya arteriyel tromboembolizm</td>
                        <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800 ml-1">0</span> / Evet <span className="font-bold text-gray-800 ml-1">2</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800">Vasküler hastalık</td>
                        <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800 ml-1">0</span> / Evet <span className="font-bold text-gray-800 ml-1">1</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-800">Diyabet mellitus</td>
                        <td className="py-2 px-3 text-right text-gray-600">HAYIR <span className="font-bold text-gray-800 ml-1">0</span> / Evet <span className="font-bold text-gray-800 ml-1">1</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gerçekler ve Rakamlar */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Tercüme:</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr>
                        <th className="py-2 px-3 font-semibold text-center w-16">Puan</th>
                        <th className="py-2 px-3 font-semibold text-center">İskemik İnme Görülme Oranı<br/><span className="font-normal opacity-70">(100 Hasta Yılı Başına)</span></th>
                        <th className="py-2 px-3 font-semibold">Tavsiye</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 px-3 font-bold text-center">0</td>
                        <td className="py-2 px-3 text-center">0.5</td>
                        <td className="py-2 px-3 font-medium text-green-700">Antikoagülasyon önerilmemektedir.</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold text-center">1</td>
                        <td className="py-2 px-3 text-center">1.5</td>
                        <td className="py-2 px-3 font-medium text-yellow-700">Antikoagülasyon düşünülmelidir.</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold text-center">2</td>
                        <td className="py-2 px-3 text-center">2.9</td>
                        <td className="py-2 px-3 font-medium text-red-700" rowSpan="7" style={{ verticalAlign: 'top', paddingTop: '12px' }}>
                          Antikoagülasyon önerilmelidir.
                        </td>
                      </tr>
                      <tr><td className="py-2 px-3 font-bold text-center">3</td><td className="py-2 px-3 text-center">5.1</td></tr>
                      <tr><td className="py-2 px-3 font-bold text-center">4</td><td className="py-2 px-3 text-center">7.3</td></tr>
                      <tr><td className="py-2 px-3 font-bold text-center">5</td><td className="py-2 px-3 text-center">11.2</td></tr>
                      <tr><td className="py-2 px-3 font-bold text-center">6</td><td className="py-2 px-3 text-center">15.5</td></tr>
                      <tr><td className="py-2 px-3 font-bold text-center">7</td><td className="py-2 px-3 text-center">14.7</td></tr>
                      <tr><td className="py-2 px-3 font-bold text-center">8</td><td className="py-2 px-3 text-center">19.5</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edebiyat (YENİ EKLENEN TIKLANABİLİR LİNKLER) */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Edebiyat</h3>
                
                <div className="space-y-4">
                  {/* Orijinal/Birincil Referans */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Orijinal/Birincil Referans</div>
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/39217497/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm leading-relaxed block"
                    >
                      Champsi A, Mobley AR, Subramanian A ve diğerleri. Atriyal fibrilasyonda cinsiyet ve güncel olumsuz olay riski. Avrupa Kalp Dergisi. 2024;45(36):3707-3717.
                    </a>
                  </div>

                  {/* Doğrulama */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Doğrulama</div>
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/39171253/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm leading-relaxed block"
                    >
                      Teppo K, Lip GYH, Airaksinen KEJ ve diğerleri. Atriyal fibrilasyonlu hastalarda inme riski sınıflandırması için CHA2DS2-VA ve CHA2DS2-VASc skorlarının karşılaştırılması: Retrospektif Finlandiya Atriyal Fibrilasyonda Antikoagülan Tedavi (Finacaf) kohortundan zamansal eğilim analizi. The Lancet Regional Health - Europe. 2024;43:100967.
                    </a>
                  </div>

                  {/* Klinik Uygulama Kılavuzları */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Klinik Uygulama Kılavuzları</div>
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/39210723/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm leading-relaxed block"
                    >
                      Van Gelder IC, Rienstra M, Bunting KV, ve diğerleri. Avrupa Kardiyotorasik Cerrahi Birliği (EACTS) ile işbirliği içinde geliştirilen atriyal fibrilasyonun yönetimi için 2024 ESC kılavuzları. Avrupa Kalp Dergisi. 2024;45(36):3314-3414.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEKME 3: İÇERİK OLUŞTURUCUSU */}
          {activeTab === "icerik" && (
            <div className="animate-fade-in text-sm text-gray-700 border border-gray-100 p-4 rounded-xl bg-gray-50 text-left">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Dr. Asgher Champsi</h3>
              <p className="text-gray-500 text-xs mb-3">Kardiyovasküler Tıp Uzmanı</p>
              <p className="leading-relaxed mb-4">
              </p>Asgher Champsi, MD, Birmingham Üniversitesi'nde klinik araştırma görevlisi ve kardiyoloji uzmanı asistanıdır. Atriyal fibrilasyon ve kalp yetmezliği olan hastaların bakımını iyileştirmek için büyük veri, makine öğrenimi ve yapay zekayı kullanma konusunda uzmanlaşmıştır.
              <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Champsi+A+%5Bauthor%5D&sort=date" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium text-xs">
                Yayınlarını PubMed'de Görüntüle →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// DİĞER BİLEŞENLER (ChecklistCalc, GksCalc, BmiCalc)
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
              ? "bg-blue-50 border-blue-300 text-blue-800 font-medium"
              : "bg-white border-gray-200 text-gray-700 hover:border-blue-200"
          }`}
        >
          <span className="text-sm">{item.label}</span>
          <span className="text-sm font-medium">+{item.pts}</span>
        </div>
      ))}
      <button
        onClick={calculate}
        className="w-full mt-4 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition shadow-sm"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white text-center">
          <div className="text-5xl font-bold text-gray-800 mb-1">{result.score}</div>
          <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Toplam Puan</div>
          <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>
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
        <div key={key} className="mb-5">
          <label className="text-sm text-gray-500 mb-2 block font-medium">{labels[key]}</label>
          <div className="flex flex-wrap gap-2">
            {options.map(([label, val]) => (
              <button
                key={val}
                onClick={() => { setVals((p) => ({ ...p, [key]: val })); setResult(null); }}
                className={`px-3 py-2 rounded-xl text-sm border transition ${
                  vals[key] === val
                    ? "bg-blue-700 text-white border-blue-700 font-medium shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {label} <span className="opacity-70 ml-1">({val})</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={calculate}
        className="w-full mt-2 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition shadow-sm"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white text-center">
          <div className="text-5xl font-bold text-gray-800 mb-1">{result.score} <span className="text-2xl text-gray-400">/ 15</span></div>
          <div className="text-sm text-gray-500 font-medium mb-3">E{vals.goz} + V{vals.verbal} + M{vals.motor}</div>
          <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>
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
        <label className="text-sm text-gray-500 mb-1 block font-medium">Boy (cm)</label>
        <input
          type="number"
          value={boy}
          onChange={(e) => { setBoy(e.target.value); setResult(null); }}
          placeholder="örn. 175"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm text-gray-500 mb-1 block font-medium">Kilo (kg)</label>
        <input
          type="number"
          value={kilo}
          onChange={(e) => { setKilo(e.target.value); setResult(null); }}
          placeholder="örn. 70"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>
      <button
        onClick={calculate}
        className="w-full py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition shadow-sm"
      >
        Hesapla
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-white text-center">
          <div className="text-5xl font-bold text-gray-800 mb-1">{result.bmi.toFixed(1)}</div>
          <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">kg/m²</div>
          <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>
            {result.interp.text}
          </div>
        </div>
      )}
    </div>
  );
}

// ANA EKRAN
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
    <div className="max-w-2xl mx-auto p-4 pb-12">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 text-sm mb-5 hover:underline flex items-center gap-1 font-medium"
      >
        ← Ana sayfa
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[calc.category]}`}>
          {calc.category}
        </span>
        <h1 className="text-2xl font-bold text-gray-800 mt-3">{calc.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{calc.description}</p>
        
        <button
          onClick={() => toggleFavorite(calc.id)}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-yellow-500 transition"
        >
          {isFavorite(calc.id) ? "⭐ Favorilerden çıkar" : "☆ Favorilere ekle"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {calc.type === "cha2ds2" && <Cha2ds2Calc calc={calc} />}
        {calc.type === "checklist" && <ChecklistCalc calc={calc} />}
        {calc.type === "gks" && <GksCalc calc={calc} />}
        {calc.type === "bmi" && <BmiCalc calc={calc} />}
      </div>
    </div>
  );
}