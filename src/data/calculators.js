export const calculators = [
  {
    id: "cha2ds2",
    name: "Atriyal Fibrilasyon İnme Riski için CHA₂DS₂-VA Skoru",
    description: "AF'li hastalar için inme riskini hesaplar; cinsiyeti dikkate almayan güncel modeldir.",
    category: "kardiyoloji",
    type: "cha2ds2",
    // Yaş seçenekleri JS'ye taşındı
    ageOptions: [
      { label: "< 65", pts: 0 },
      { label: "65-74", pts: 1 },
      { label: "≥ 75", pts: 2 },
    ],
    items: [
      { label: "Konjestif kalp yetmezliği", pts: 1 },
      { label: "Hipertansiyon", pts: 1 },
      { label: "Diyabetes mellitus", pts: 1 },
      { label: "İnme / TİA / Tromboemboli öyküsü", pts: 2 },
      { label: "Vasküler hastalık (Önceki MI, PAD veya aort plağı)", pts: 1 },
    ],
    interpret: [
      { max: 0, cls: "low", text: "Düşük risk — Antikoagülan önerilmez." },
      { max: 1, cls: "mid", text: "Orta risk — Antikoagülan düşünülmelidir." },
      { max: 99, cls: "high", text: "Yüksek risk — Oral antikoagülan önerilir." },
    ],
    // Tüm sekmeler, metinler ve referanslar JS'ye taşındı!
    details: {
      nextSteps: {
        advice: [
          "Bu aracın sonuçlarını, kapsamlı değerlendirme, klinik yargı, uzman önerileri ve hasta tercihiyle birlikte, atriyal fibrilasyonda tromboembolik riskin yönetimine rehberlik etmek için kullanın.",
          "Felç riskini periyodik aralıklarla yeniden değerlendirin."
        ],
        management: [
          { score: "2 veya daha yüksek puan:", cls: "red", text: "Felç riskini azaltmak için oral antikoagülan tedavi önerilir. Kanama riskini değerlendirmek için bir kanama riski skorlama sistemi (örneğin, ATRIA, DOAC, HAS-BLED, HEMORR₂HAGES, ORBIT) kullanmayı düşünün." },
          { score: "1 puan:", cls: "yellow", text: "Antikoagülasyonun risklerini ve faydalarını değerlendirmek için klinik yargınızı kullanın." },
          { score: "0 puan:", cls: "green", text: "Antikoagülasyon önerilmez." }
        ],
        footer: "Ek öneriler için lütfen ESC'nin AF yönetimiyle ilgili kılavuzlarına bakın."
      },
      evidence: {
        formulaText: "CHA₂DS₂-VA Skoru, her bir değişken için seçilen puanların toplanmasıyla belirlenir:",
        stats: [
          { pts: "0", rate: "0.5", rec: "Antikoagülasyon önerilmemektedir.", color: "text-green-700" },
          { pts: "1", rate: "1.5", rec: "Antikoagülasyon düşünülmelidir.", color: "text-yellow-700" },
          { pts: "2", rate: "2.9", rec: "Antikoagülasyon önerilmelidir.", color: "text-red-700", rowspan: 7 },
          { pts: "3", rate: "5.1" },
          { pts: "4", rate: "7.3" },
          { pts: "5", rate: "11.2" },
          { pts: "6", rate: "15.5" },
          { pts: "7", rate: "14.7" },
          { pts: "8", rate: "19.5" }
        ],
        literature: [
          { type: "Orijinal/Birincil Referans", title: "Champsi A, Mobley AR, Subramanian A ve diğerleri. Atriyal fibrilasyonda cinsiyet ve güncel olumsuz olay riski. Avrupa Kalp Dergisi. 2024;45(36):3707-3717.", link: "https://pubmed.ncbi.nlm.nih.gov/39217497/" },
          { type: "Doğrulama", title: "Teppo K, Lip GYH, Airaksinen KEJ ve diğerleri. Atriyal fibrilasyonlu hastalarda inme riski sınıflandırması için CHA2DS2-VA ve CHA2DS2-VASc skorlarının karşılaştırılması: Retrospektif Finlandiya Atriyal Fibrilasyonda Antikoagülan Tedavi (Finacaf) kohortundan zamansal eğilim analizi. The Lancet Regional Health - Europe. 2024;43:100967.", link: "https://pubmed.ncbi.nlm.nih.gov/39171253/" },
          { type: "Klinik Uygulama Kılavuzları", title: "Van Gelder IC, Rienstra M, Bunting KV, ve diğerleri. Avrupa Kardiyotorasik Cerrahi Birliği (EACTS) ile işbirliği içinde geliştirilen atriyal fibrilasyonun yönetimi için 2024 ESC kılavuzları. Avrupa Kalp Dergisi. 2024;45(36):3314-3414.", link: "https://pubmed.ncbi.nlm.nih.gov/39210723/" }
        ]
      },
      creator: {
        name: "Dr. Asgher Champsi",
        title: "Kardiyovasküler Tıp Uzmanı",
        bio: "Asgher Champsi, MD, Birmingham Üniversitesi'nde klinik araştırma görevlisi ve kardiyoloji uzmanı asistanıdır. Atriyal fibrilasyon ve kalp yetmezliği olan hastaların bakımını iyileştirmek için büyük veri, makine öğrenimi ve yapay zekayı kullanma konusunda uzmanlaşmıştır.",
        linkText: "Yayınlarını PubMed'de Görüntüle →",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=Champsi+A+%5Bauthor%5D&sort=date"
      }
    }
  },
  {
    id: "gks",
    name: "Glasgow Koma Skalası (GCS)",
    description: "Nörolojik bilinç düzeyi değerlendirmesi.",
    category: "noroloji",
    type: "gks",
    sections: [
      {
        id: "goz",
        title: "En iyi göz tepkisi",
        info: "Yerel yaralanma, ödem veya başka bir nedenle değerlendirilemeyen durumlar için 'Test edilemez (NT)' işaretini koyun.",
        options: [
          { label: "Kendiliğinden", pts: 4 }, { label: "Sözlü komuta", pts: 3 }, { label: "Ağrıya", pts: 2 }, { label: "Göz açıcı değil", pts: 1 }, { label: "Test edilemez", pts: "NT" }
        ],
      },
      {
        id: "verbal",
        title: "En iyi sözlü yanıt",
        info: "Entübe edilmişse veya başka bir nedenle değerlendirilemiyorsa, 'Test edilemez (NT)' olarak işaretleyin.",
        options: [
          { label: "Yönlendirilmiş", pts: 5 }, { label: "Kafası karışık", pts: 4 }, { label: "Uygunsuz kelimeler", pts: 3 }, { label: "Anlaşılmaz sesler", pts: 2 }, { label: "Sözlü yanıt yok", pts: 1 }, { label: "Test edilemez/entübe edilemez", pts: "NT" }
        ],
      },
      {
        id: "motor",
        title: "En iyi motor yanıt",
        info: "Eğer değerlendirilemiyorsa (felç, alçı vb.), 'Test edilemez (NT)' işaretleyin.",
        options: [
          { label: "Emirlere uyar", pts: 6 }, { label: "Lokalize eder", pts: 5 }, { label: "Normal fleksiyon (Çeker)", pts: 4 }, { label: "Anormal fleksiyon", pts: 3 }, { label: "Ekstansiyon", pts: 2 }, { label: "Motor yanıt yok", pts: 1 }, { label: "Test edilemez", pts: "NT" }
        ],
      },
    ],
    interpret: [
      { max: 8, cls: "high", text: "Ağır yaralanma (GKS ≤ 8). Hava yolu koruması kritik." },
      { max: 12, cls: "mid", text: "Orta şiddetli yaralanma (GKS 9–12)." },
      { max: 15, cls: "low", text: "Hafif yaralanma (GKS 13–15)." },
    ],
  },
  {
    id: "wells-pe",
    name: "Wells'in Pulmoner Emboli Kriterleri",
    description: "Pulmoner emboli riskini objektif değerlendirir.",
    category: "acil",
    type: "checklist",
    items: [
      { label: "DVT klinik bulguları ve belirtileri", pts: 3 },
      { label: "PE en olası tanıdır veya aynı olasılıkta", pts: 3 },
      { label: "Kalp hızı > 100/dk", pts: 1.5 },
      { label: "Son 4 haftada cerrahi veya 3 gün immobilizasyon", pts: 1.5 },
      { label: "Önceki DVT/PE öyküsü", pts: 1.5 },
      { label: "Hemoptizi", pts: 1 },
      { label: "Malignite", pts: 1 },
    ],
    interpret: [
      { max: 1, cls: "low", text: "Düşük olasılık — D-dimer ile ekarte edilebilir." },
      { max: 6, cls: "mid", text: "Orta olasılık — BT anjiyografi önerilir." },
      { max: 99, cls: "high", text: "Yüksek olasılık — BT anjiyografi endikasyonu var." },
    ],
  },
  {
    id: "bmi",
    name: "BMI Hesabı",
    description: "Vücut kitle indeksi",
    category: "genel",
    type: "bmi",
    interpret: [
      { max: 18.4, cls: "mid", text: "Zayıf (< 18.5)." },
      { max: 24.9, cls: "low", text: "Normal kilolu (18.5–24.9)." },
      { max: 29.9, cls: "mid", text: "Fazla kilolu (25–29.9)." },
      { max: 99, cls: "high", text: "Obez (≥ 30)." },
    ],
  },
];