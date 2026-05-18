import { useState } from "react";

export default function InfoTabs({ data, customTavsiye, customYonetim, customKanit }) {
  const [activeTab, setActiveTab] = useState("sonraki");

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
          {customTavsiye ? customTavsiye : (
            data.tavsiye && (
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50">
                <h3 className="font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">TAVSİYE</h3>
                <ul className="space-y-2">
                  {data.tavsiye.map((t, i) => {
                    const metin = typeof t === "string" ? t : t.text;
                    const noktasiz = typeof t === "object" && t.noBullet;
                    return (
                      <li key={i} className={`${noktasiz ? "list-none" : "ml-5 list-disc"} text-blue-800 text-sm leading-relaxed font-normal`}>
                        {metin}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          )}

          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            {customYonetim ? customYonetim : (
              data.yonetim && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">YÖNETMEK</h3>
                  {data.yonetim.map((y, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${y.cls}`}>
                      <div className="font-bold mb-1">{y.score}</div>
                      <div className="text-sm leading-relaxed opacity-90">{y.text}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {activeTab === "kanit" && (
        <div className="space-y-8 animate-fade-in text-sm text-gray-700 text-left">
          {data.formul && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">FORMÜL</h3>
              {data.formul.map((f, idx) => <p key={idx} className="leading-relaxed mb-2">{f}</p>)}
            </div>
          )}

          {customKanit ? customKanit : (
            data.stats && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left bg-white text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <tr><th className="py-2.5 px-3 font-semibold text-center">Skor / Puan</th><th className="py-2.5 px-3 font-semibold text-center">Oran</th><th className="py-2.5 px-3 font-semibold">Tavsiye</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.stats.map((s, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-bold text-center">{s.pts}</td>
                          <td className="py-2.5 px-3 text-center">{s.rate}</td>
                          <td className={`py-2.5 px-3 font-medium ${s.color}`} rowSpan={s.rowspan || 1} style={s.rowspan ? { verticalAlign: 'top', paddingTop: '10px' } : {}}>
                            {s.rec}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}

          {data.degerlendirme && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Kanıt Değerlendirmesi</h3>
              <div className="space-y-4 leading-relaxed text-gray-600">
                {data.degerlendirme.map((item, idx) => {
                  if (typeof item === "string") return <p key={idx}>{item}</p>;
                  if (item.type === "p") return <p key={idx}>{item.text}</p>;
                  if (item.type === "ul") return (
                    <ul key={idx} className="list-disc ml-5 space-y-1.5 pb-2">
                      {item.items.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  );
                  return null;
                })}
              </div>
            </div>
          )}

          {data.edebiyat && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Edebiyat</h3>
              <div className="space-y-4">
                {data.edebiyat.map((ref, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{ref.kat}</div>
                    {ref.link ? (
                      <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-[13px] text-blue-600 leading-relaxed break-words hover:underline cursor-pointer block">{ref.ref}</a>
                    ) : (
                      <p className="text-[13px] text-blue-600 leading-relaxed break-words hover:underline cursor-pointer">{ref.ref}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "icerik" && data.creator && (
        <div className="animate-fade-in text-sm text-gray-700 border border-gray-100 p-5 rounded-xl bg-gray-50 text-left">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{data.creator.name}</h3>
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide font-semibold">{data.creator.title}</p>
          <p className="leading-relaxed mb-4">{data.creator.bio}</p>
          {data.creator.link && (
            <a href={data.creator.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium text-xs">Yayınlarını PubMed'de Görüntüle →</a>
          )}
        </div>
      )}
    </div>
  );
}