import { useFavorites } from "../hooks/useFavorites";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculators } from "../data/calculators";

const categories = [
  { id: "hepsi", label: "Hepsi" },
  { id: "kardiyoloji", label: "❤️ Kardiyoloji" },
  { id: "acil", label: "🚨 Acil Tıp" },
  { id: "noroloji", label: "🧠 Nöroloji" },
  { id: "genel", label: "🩺 Genel" },
  { id: "favoriler", label: "⭐ Favoriler" },
];

const catColors = {
  kardiyoloji: "bg-red-50 text-red-700",
  acil: "bg-orange-50 text-orange-700",
  noroloji: "bg-purple-50 text-purple-700",
  genel: "bg-teal-50 text-teal-700",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("hepsi");
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filtered = calculators.filter((c) => {
    // 1. DÜZELTME: Favoriler sekmesi seçiliyse sadece favorileri döndür
    if (cat === "favoriler") return isFavorite(c.id); 
    
    const matchCat = cat === "hepsi" || c.category === cat;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Arama */}
      <div className="relative mb-4 mt-2">
        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Hesaplayıcı ara... (örn. Wells, GKS, BMI)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
        />
      </div>

      {/* Kategoriler */}
      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              cat === c.id
                ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sonuç sayısı */}
      <p className="text-xs text-gray-400 mb-3">{filtered.length} hesaplayıcı</p>

      {/* Kart listesi */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/calc/${c.id}`)}
            className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer transition group flex flex-col justify-between"
          >
            <div>
              {/* 2. DÜZELTME: Başlık ve Yıldız Butonu eklendi */}
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition pr-2">
                  {c.name}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Karta tıklamayı engeller, sadece yıldıza tıklar
                    toggleFavorite(c.id);
                  }}
                  className="text-lg leading-none focus:outline-none"
                >
                  {isFavorite(c.id) ? "⭐" : "☆"}
                </button>
              </div>
              <div className="text-gray-400 text-xs mt-1 leading-snug">{c.description}</div>
            </div>
            
            <div className="mt-3">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${catColors[c.category]}`}>
                {categories.find((x) => x.id === c.category)?.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Boş sonuç uyarıları */}
      {filtered.length === 0 && cat !== "favoriler" && (
        <div className="text-center text-gray-400 text-sm mt-12">
          Arama sonucu bulunamadı.
        </div>
      )}
      {filtered.length === 0 && cat === "favoriler" && (
        <div className="text-center text-gray-400 text-sm mt-12">
          Henüz favoriye eklediğiniz bir hesaplayıcı yok. Kartlardaki yıldızlara tıklayarak ekleyebilirsiniz.
        </div>
      )}
    </div>
  );
}