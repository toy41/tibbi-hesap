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
  if (typeof score === "string") return { text: "Bazı değerler test edilemez olarak işaretlendi.", cls: "mid" };
  return interpret?.find((i) => score <= i.max) || interpret?.[interpret.length - 1];
}

// --- DİĞER HESAPLAYICILAR İÇİN SEKME BİLEŞENİ (CHA2DS2 HARİÇ) ---
function InfoTabs({ calcId }) {
  const [activeTab, setActiveTab] = useState("sonraki");

  const getTabContent = () => {
    switch (calcId) {
      case "gks":
        return {
          tavsiye: ["GKS, hastanın nörolojik durumundaki değişiklikleri izlemek için seri olarak değerlendirilmelidir.", "GKS'de 2 veya daha fazla puanlık bir düşüş acil müdahale gerektirebilir."],
          yonetim: [
            { score: "GKS ≤ 8 (Ağır):", cls: "bg-red-50 text-red-800 border-red-100", text: "Hava yolunu koruyamama riski yüksektir. Entübasyon güçlü bir şekilde düşünülmelidir." },
            { score: "GKS 9-12 (Orta):", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Yakın takip ve genellikle Beyin Tomografisi (BT) endikasyonu vardır." },
            { score: "GKS 13-15 (Hafif):", cls: "bg-green-50 text-green-800 border-green-100", text: "Düşük riskli grup. Klinik duruma göre gözlem planlanabilir." }
          ],
          formul: "GKS Skoru; Göz (1-4) + Sözel (1-5) + Motor (1-6) yanıtların toplanmasıyla elde edilir.",
          stats: [
            { pts: "≤ 8", rate: "Ağır Yaralanma", rec: "Entübasyon Düşün", color: "text-red-700" },
            { pts: "9-12", rate: "Orta Yaralanma", rec: "Yakın Takip/BT", color: "text-yellow-700" },
            { pts: "13-15", rate: "Hafif Yaralanma", rec: "Gözlem/Taburcu", color: "text-green-700" }
          ],
          creator: { name: "Prof. Graham Teasdale & Prof. Bryan Jennett", title: "Nöroşirürji Uzmanları", bio: "Skala, 1974 yılında Glasgow Üniversitesi'nde kafa travması geçiren hastaların bilinç düzeyini standartlaştırmak amacıyla geliştirilmiştir." }
        };
      case "wells-pe":
        return {
          tavsiye: ["Düşük riskli hastalarda PERC kuralı uygulanabilir.", "Tanıda klinik olasılığa göre D-Dimer veya BT Anjiyo seçilir."],
          yonetim: [
            { score: "> 6 Puan (Yüksek):", cls: "bg-red-50 text-red-800 border-red-100", text: "Pulmoner Emboli ihtimali yüksektir (~%40.6). Doğrudan BT Anjiyografi istenmelidir." },
            { score: "2 - 6 Puan (Orta):", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "PE ihtimali orta düzeydedir (~%16.2). D-Dimer veya görüntüleme düşünün." },
            { score: "< 2 Puan (Düşük):", cls: "bg-green-50 text-green-800 border-green-100", text: "PE ihtimali düşüktür (~%1.3). Negatif D-Dimer tanıyı ekarte ettirir." }
          ],
          formul: "Klinik değerlendirme sonucunda pozitif olan bulguların puanları toplanır.",
          stats: [
            { pts: "< 2", rate: "~%1.3", rec: "D-Dimer Yeterli", color: "text-green-700" },
            { pts: "> 6", rate: "~%40.6", rec: "BT Anjiyo İste", color: "text-red-700" }
          ],
          creator: { name: "Dr. Philip S. Wells", title: "Hematoloji Profesörü", bio: "Ottawa Üniversitesi'nde Hematoloji Bölüm Başkanıdır. Venöz tromboembolizm teşhisinde dünyaca ünlü Wells skorlarının yaratıcısıdır." }
        };
      case "bmi":
        return {
          tavsiye: ["BMI doğrudan vücut yağını ölçmez. Kaslı sporcularda veya ödemi olanlarda yanıltıcı olabilir.", "Bel çevresi ile birlikte değerlendirilmelidir."],
          yonetim: [
            { score: "BMI ≥ 30 (Obezite):", cls: "bg-red-50 text-red-800 border-red-100", text: "Kardiyovasküler hastalık riski artmıştır. Diyetisyen yönlendirmesi önerilir." },
            { score: "BMI 25-29.9 (Fazla Kilolu):", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Sağlıklı beslenme ve düzenli egzersiz hedeflenmelidir." },
            { score: "BMI < 18.5 (Zayıf):", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Beslenme yetersizliği açısından değerlendirme gerektirir." }
          ],
          formul: "BMI = Ağırlık (kg) / Boy² (m²)",
          stats: [
            { pts: "18.5-24.9", rate: "Normal", rec: "Sağlıklı Aralık", color: "text-green-700" },
            { pts: "≥ 30", rate: "Obez", rec: "Riskli", color: "text-red-700" }
          ],
          creator: { name: "Adolphe Quetelet", title: "Matematikçi", bio: "BMI'ın temeli olan Quetelet İndeksi'ni 1832 yılında insan büyüme oranlarını tanımlamak için geliştirmiştir." }
        };
      default:
        return null;
    }
  };

  const data = getTabContent();
  if (!data) return null;

  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <div className="flex gap-2 mb-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
        <button onClick={() => setActiveTab("sonraki")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${activeTab === "sonraki" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Sonraki Adımlar</button>
        <button onClick={() => setActiveTab("kanit")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${activeTab === "kanit" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Kanıt</button>
        <button onClick={() => setActiveTab("icerik")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${activeTab === "icerik" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>İçerik Oluşturucusu</button>
      </div>

      {activeTab === "sonraki" && (
        <div className="space-y-4 animate-fade-in text-left">
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50">
            <h3 className="font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">TAVSİYE</h3>
            {data.tavsiye.map((t, i) => <p key={i} className={`text-blue-800 text-sm leading-relaxed ${i === 0 ? "mb-2" : "font-semibold"}`}>{t}</p>)}
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">YÖNETMEK</h3>
            <div className="space-y-3">
              {data.yonetim.map((y, i) => (
                <div key={i} className={`p-3 rounded-lg border ${y.cls}`}>
                  <div className="font-bold mb-1">{y.score}</div>
                  <div className="text-sm leading-relaxed opacity-90">{y.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "kanit" && (
        <div className="space-y-6 animate-fade-in text-sm text-gray-700 text-left">
          <div>
            <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">FORMÜL</h3>
            <p className="leading-relaxed mb-3">{data.formul}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left bg-white text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-center w-16">Puan</th>
                    <th className="py-2.5 px-3 font-semibold text-center">İnme Oranı<br/><span className="text-[10px] opacity-60">(100 Hasta Yılı)</span></th>
                    <th className="py-2.5 px-3 font-semibold">Tavsiye</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.stats.map((s, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-bold text-center">{s.pts}</td>
                      <td className="py-2.5 px-3 text-center">{s.rate}</td>
                      {s.rec && (
                        <td className={`py-2.5 px-3 font-medium ${s.color}`} rowSpan={s.rowspan || 1} style={s.rowspan ? { verticalAlign: 'top', paddingTop: '10px' } : {}}>
                          {s.rec}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "icerik" && (
        <div className="animate-fade-in text-sm text-gray-700 border border-gray-100 p-5 rounded-xl bg-gray-50 text-left">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{data.creator.name}</h3>
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide font-semibold">{data.creator.title}</p>
          <p className="leading-relaxed mb-4">{data.creator.bio}</p>
        </div>
      )}
    </div>
  );
}

// 1. CHA2DS2 BİLEŞENİ (KESİNLİKLE DOKUNULMAMIŞ HALİ)
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

// 2. GKS BİLEŞENİ (FOTOĞRAFTAKİ İKİ SÜTUNLU TASARIM)
function GksCalc({ calc }) {
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
    { 
      id: "goz", 
      title: "En iyi göz tepkisi", 
      info: "Yerel yaralanma, ödem veya başka bir nedenle değerlendirilemeyen durumlar için \"Test edilemez (NT)\" işaretini koyun.",
      options: [{ label: "Kendiliğinden", pts: 4 }, { label: "Sözlü komuta", pts: 3 }, { label: "Ağrıya", pts: 2 }, { label: "Göz açıcı değil", pts: 1 }, { label: "Test edilemez", pts: "NT" }] 
    },
    { 
      id: "verbal", 
      title: "En iyi sözlü yanıt", 
      info: "Entübe edilmişse veya başka bir nedenle değerlendirilemiyorsa, \"Test edilemez (NT)\" olarak işaretleyin.",
      options: [{ label: "Yönlendirilmiş", pts: 5 }, { label: "Kafası karışık", pts: 4 }, { label: "Uygunsuz kelimeler", pts: 3 }, { label: "Anlaşılmaz sesler", pts: 2 }, { label: "Sözlü yanıt yok", pts: 1 }, { label: "Test edilemez/entübe edilemez", pts: "NT" }] 
    },
    { 
      id: "motor", 
      title: "En iyi motor yanıt", 
      info: "Eğer değerlendirilemiyorsa (felç, alçı vb.), \"Test edilemez (NT)\" işaretleyin.",
      options: [{ label: "Emirlere uyar", pts: 6 }, { label: "Lokalize eder", pts: 5 }, { label: "Normal fleksiyon (Çeker)", pts: 4 }, { label: "Anormal fleksiyon", pts: 3 }, { label: "Ekstansiyon", pts: 2 }, { label: "Motor yanıt yok", pts: 1 }, { label: "Test edilemez", pts: "NT" }] 
    }
  ];

  return (
    <div className="text-left">
      {sections.map((s) => (
        <div key={s.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div>
            <h3 className="text-lg text-gray-800 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed pr-0 md:pr-4">{s.info}</p>
          </div>
          <div className="border border-gray-300 rounded-lg flex flex-col overflow-hidden shadow-sm bg-white">
            {s.options.map((opt) => (
              <button 
                key={opt.pts} 
                onClick={() => { setVals((p) => ({ ...p, [s.id]: opt.pts })); setResult(null); }} 
                className={`w-full py-3.5 px-4 text-center text-sm transition-colors border-b border-gray-200 last:border-b-0 ${
                  vals[s.id] === opt.pts ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                {opt.label} ({opt.pts === "NT" ? "NT" : `+${opt.pts}`})
              </button>
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
          <InfoTabs calcId={calc.id} />
        </div>
      )}
    </div>
  );
}

// 3. CHECKLIST (WELLS PE) BİLEŞENİ
function ChecklistCalc({ calc }) {
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
          <InfoTabs calcId={calc.id} />
        </div>
      )}
    </div>
  );
}

// 4. BMI BİLEŞENİ
function BmiCalc({ calc }) {
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(boy); const k = parseFloat(kilo);
    if (!b || !k) return;
    const bmi = k / ((b / 100) ** 2);
    setResult({ bmi, interp: getInterp(calc.interpret, bmi) });
  };

  return (
    <div className="text-left">
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-1 block font-medium">Boy (cm)</label>
        <input type="number" value={boy} onChange={(e) => { setBoy(e.target.value); setResult(null); }} placeholder="örn. 175" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </div>
      <div className="mb-5">
        <label className="text-sm text-gray-500 mb-1 block font-medium">Kilo (kg)</label>
        <input type="number" value={kilo} onChange={(e) => { setKilo(e.target.value); setResult(null); }} placeholder="örn. 70" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </div>
      <button onClick={calculate} className="w-full py-3 bg-blue-700 text-white rounded-xl font-medium shadow-sm">Hesapla</button>
      
      {result && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-white text-center mb-5">
            <div className="text-5xl font-bold text-gray-800 mb-1">{result.bmi.toFixed(1)}</div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">kg/m²</div>
            <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>{result.interp.text}</div>
          </div>
          <InfoTabs calcId={calc.id} />
        </div>
      )}
    </div>
  );
}

// --- ANA EKRAN ---
export default function Calculator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const calc = calculators.find((c) => c.id === id);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!calc) return <div className="p-6">Hesaplayıcı bulunamadı.</div>;

  const catColors = { kardiyoloji: "bg-red-50 text-red-700", acil: "bg-orange-50 text-orange-700", noroloji: "bg-purple-50 text-purple-700", genel: "bg-teal-50 text-teal-700" };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-12">
      <button onClick={() => navigate("/")} className="text-blue-600 text-sm mb-5 hover:underline flex items-center gap-1 font-medium">← Ana sayfa</button>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm text-left">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[calc.category]}`}>{calc.category}</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-3">{calc.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{calc.description}</p>
        
        <button onClick={() => toggleFavorite(calc.id)} className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-yellow-500 transition">
          {isFavorite(calc.id) ? "⭐ Favorilerden çıkar" : "☆ Favorilere ekle"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
        {calc.type === "cha2ds2" && <Cha2ds2Calc calc={calc} />}
        {calc.type === "checklist" && <ChecklistCalc calc={calc} />}
        {calc.type === "gks" && <GksCalc calc={calc} />}
        {calc.type === "bmi" && <BmiCalc calc={calc} />}
      </div>
    </div>
  );
}