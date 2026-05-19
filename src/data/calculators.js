export const calculators = [
  {
    id: "cha2ds2",
    name: "Atriyal Fibrilasyon İnme Riski için CHA₂DS₂-VA Skoru",
    description: "Atriyal fibrilasyonlu hastalar için inme riskini hesaplar; CHA₂DS₂-VASc Skoru'na benzer ancak cinsiyeti dikkate almaz.",
    category: "kardiyoloji",
    type: "cha2ds2", 
    items: [
      { label: "Konjestif kalp yetmezliği", pts: 1 },
      { label: "Hipertansiyon", pts: 1 },
      { label: "Diyabetes mellitus", pts: 1 },
      { label: "İnme / TİA öyküsü", pts: 2 },
      { label: "Vasküler hastalık", pts: 1 },
    ],
    interpret: [
      { max: 0, cls: "low", text: "Düşük risk — yıllık iskemik inme görülme sıklığı ~%0.5. Antikoagülan genellikle önerilmez." },
      { max: 1, cls: "mid", text: "Orta risk — yıllık iskemik inme görülme sıklığı ~%1.5. Antikoagülan düşünülmelidir." },
      { max: 2, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%2.9. Antikoagülan önerilmelidir." },
      { max: 3, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%5.1. Antikoagülan önerilmelidir." },
      { max: 4, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%7.3. Antikoagülan önerilmelidir." },
      { max: 5, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%11.2. Antikoagülan önerilmelidir." },
      { max: 6, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%14.7. Antikoagülan önerilmelidir." },
      { max: 7, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%15.2. Antikoagülan önerilmelidir." },
      { max: 8, cls: "high", text: "Yüksek risk — yıllık iskemik inme görülme sıklığı ~%19.5. Antikoagülan önerilmelidir." },
      { max: 99, cls: "high", text: "Yüksek risk — Oral antikoagülan önerilmelidir." },
    ],
    topInfo: {
      when: ["(Metin eklenecek...)"],
      pearls: ["(Metin eklenecek...)"],
      why: ["(Metin eklenecek...)"]
    },
    infoData: {
      renderType: "cha2ds2",
      tavsiye: [
        "Bu aracın sonuçlarını, kapsamlı değerlendirme, klinik yargı, uzman önerileri ve hasta tercihiyle birlikte, atriyal fibrilasyonda tromboembolik riskin yönetimine rehberlik etmek için kullanın.",
        "Felç riskini periyodik aralıklarla yeniden değerlendirin."
      ],
      yonetim: [
        { score: "2 veya daha yüksek puan:", cls: "bg-red-50 text-red-800 border-red-100", text: "Felç riskini azaltmak için oral antikoagülan tedavi önerilir. Kanama riskini değerlendirmek için bir kanama riski skorlama sistemi (örneğin, ATRIA, DOAC, HAS-BLED, HEMORR₂HAGES, ORBIT) kullanmayı düşünün." },
        { score: "1 puan:", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Antikoagülasyonun risklerini ve faydalarını değerlendirmek için klinik yargınızı kullanın." },
        { score: "0 puan:", cls: "bg-green-50 text-green-800 border-green-100", text: "Antikoagülasyon önerilmez." }
      ],
      formul: ["CHA₂DS₂-VA Skoru, her bir değişken için seçilen puanların toplanmasıyla belirlenir:"],
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
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Champsi A, Mobley AR, Subramanian A ve diğerleri. Atriyal fibrilasyonda cinsiyet ve güncel olumsuz olay riski. Avrupa Kalp Dergisi. 2024;45(36):3707-3717.", link: "https://pubmed.ncbi.nlm.nih.gov/39217497/" },
        { kat: "Doğrulama", ref: "Teppo K, Lip GYH, Airaksinen KEJ ve diğerleri. Atriyal fibrilasyonlu hastalarda inme riski sınıflandırması için CHA2DS2-VA ve CHA2DS2-VASc skorlarının karşılaştırılması: Retrospektif Finlandiya Atriyal Fibrilasyonda Antikoagülan Tedavi (Finacaf) kohortundan zamansal eğilim analizi. The Lancet Regional Health - Europe. 2024;43:100967.", link: "https://pubmed.ncbi.nlm.nih.gov/39171253/" },
        { kat: "Klinik Uygulama Kılavuzları", ref: "Van Gelder IC, Rienstra M, Bunting KV, ve diğerleri. Avrupa Kardiyotorasik Cerrahi Birliği (EACTS) ile işbirliği içinde geliştirilen atriyal fibrilasyonun yönetimi için 2024 ESC kılavuzları. Avrupa Kalp Dergisi. 2024;45(36):3314-3414.", link: "https://pubmed.ncbi.nlm.nih.gov/39210723/" }
      ],
      creator: { 
        name: "Dr. Asgher Champsi", 
        title: "Kardiyovasküler Tıp Uzmanı", 
        bio: "Asgher Champsi, MD, Birmingham Üniversitesi'nde klinik araştırma görevlisi ve kardiyoloji uzmanı asistanıdır. Atriyal fibrilasyon ve kalp yetmezliği olan hastaların bakımını iyileştirmek için büyük veri, makine öğrenimi ve yapay zekayı kullanma konusunda uzmanlaşmıştır.",
        link: "https://pubmed.ncbi.nlm.nih.gov/?term=Champsi+A+%5Bauthor%5D&sort=date"
      }
    }
  },
  {
    id: "wells-pe",
    name: "Wells'in Pulmoner Emboli Kriterleri",
    description: "Pulmoner emboli riskini objektif bir şekilde değerlendirir.",
    category: "acil",
    type: "checklist",
    items: [
      { label: "DVT’nin klinik bulguları ve belirtileri", pts: 3 },
      { label: "PE en olası tanıdır veya aynı olasılıkta", pts: 3 },
      { label: "Kalp hızı > 100/dk", pts: 1.5 },
      { label: "En az 3 gün süreyle hareketsiz kalma VEYA önceki 4 hafta içinde ameliyat geçirme", pts: 1.5 },
      { label: "Daha önce objektif olarak teşhis edilmiş PE veya DVT", pts: 1.5 },
      { label: "Hemoptizi", pts: 1 },
      { label: "Son 6 ay içinde tedavi görmüş malignite veya palyatif tedavi", pts: 1 },
    ],
    interpret: [
      { max: 1, cls: "low", text: "Düşük risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %1,3.-Başka bir çalışmada ≤4 puan PE olasılığı düşük olarak değerlendirilmiş ve PE görülme sıklığı %3 olarak bulunmuştur." },
      { max: 2, cls: "mid", text: "Orta risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %16,2." },
      { max: 3, cls: "mid", text: "orta risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %16,2." },
      { max: 4, cls: "mid", text: "orta risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %16,2." },
      { max: 5, cls: "mid", text: "orta risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %16,2." },
      { max: 6, cls: "mid", text: "orta risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %16,2." },
      { max: 99, cls: "high", text: "yüksek risk grubu: Acil servis popülasyonunda pulmoner emboli (PE) olasılığı %37,1." },
    ],
    topInfo: {
      when: ["(Metin eklenecek...)"],
      pearls: ["(Metin eklenecek...)"],
      why: ["(Metin eklenecek...)"]
    },
    infoData: {
      renderType: "wells-pe",
      tavsiye: [
        { text: "Bazıları, düşük riskli kişileri tahmin etmek için klinik değerlendirmeden ziyade Wells skorunu kullanmayı ve ardından PERC kuralını uygulayarak pulmoner emboli (PE) araştırmalarını durdurmayı savunmaktadır.", noBullet: true },
        "Tüm klinik karar destek araçlarında olduğu gibi, hekimin Wells kriterlerini uygulamaya geçmeden önce öncelikle tanıdan şüphelenmesi gerekir.",
        "Bu aracın asıl amacı, d-dimer testi yapılmasına gerek kalmayacak kadar düşük riskli olan kişileri belirlemekti.",
        "Yaşa göre ayarlanmış d-dimer eşik değerleri, düşük riskli hastalarda (rGeneva 'yüksek değil' veya Wells düşük) 50 yaş üstü hastalarda kullanım için doğrulanmıştır. Uygun d-dimer testini kullanıyorsanız, yaşa göre ayarlanmış d-dimer eşik değerini şu şekilde hesaplamayı düşünün: Yaş (yıl) × 10 µg/L = eşik değer (50 yaş üstü hastalar için).",
        "Hem iki hem de üç kademeli modeller kabul edilmekle birlikte, kılavuzlar yalnızca yüksek hassasiyetli d-dimer kullanan ve daha muhafazakar risk sınıflandırmasına dayanan iki kademeli modeli tercih ediyor gibi görünüyor; 'orta' riskli hastaların, daha fazla risk sınıflandırması yapılmadan değerlendirilmesi için hala çok yüksek riskli olduğu düşünülüyor.",
      ],
      yonetim: [
        { score: "Üç Katmanlı Model — Düşük Risk (<2 Puan, %1.3 PE Sıklığı):", cls: "bg-green-50 text-green-800 border-green-100", text: "Pulmoner emboliyi ekarte etmek için d-dimer veya PERC kriteri düşünülebilir. Dimer negatif ise tetkiklerin durdurulmasını, pozitif ise CTA'yı değerlendirin." },
        { score: "Üç Katmanlı Model — Orta Risk (2-6 Puan, %16.2 PE Sıklığı):", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Yüksek hassasiyetli d-dimer testi veya BT anjiyografisi düşünülmelidir. Dimer negatif ise tetkiklerin durdurulmasını, pozitif ise CTA'yı değerlendirin." },
        { score: "Üç Katmanlı Model — Yüksek Risk (>6 Puan, %37.5 PE Sıklığı):", cls: "bg-red-50 text-red-800 border-red-100", text: "BT anjiyografisi düşünülmelidir. D-dimer testi önerilmemektedir." },
        { score: "İki Katmanlı Model — PE Olasılığı Düşük (0-4 Puan, %12.1 PE Sıklığı):", cls: "bg-green-50 text-green-800 border-green-100", text: "Yüksek hassasiyetli d-dimer testi düşünülmelidir. Dimer negatif ise tetkiklerin durdurulmasını, pozitif ise CTA'yı değerlendirin." },
        { score: "İki Katmanlı Model — PE Olasılığı Yüksek (>4 Puan, %37.1 PE Sıklığı):", cls: "bg-red-50 text-red-800 border-red-100", text: "BT anjiyografi (CTA) testi düşünülmelidir." }
      ],
      // KRİTİK EYLEMLER: Gri kutuda listelenecek maddeler
      kritikMaddeler: [
        "Yeni nesil d-dimer'in yüksek duyarlılığı ancak düşük özgüllüğü (yaklaşık %50) göz önüne alındığında, yüksek riskli kabul edilen hastaların BT anjiyografi ile değerlendirilmesi gerekmektedir.",
        "Özellikle durumu stabil olmayan hastalarda, canlandırma çabalarını asla tanı testleri için geciktirmeyin.",
        "Tanı testlerinden önce mutlaka anamnez ve muayene yapılmalıdır."
      ],
      formul: ["Klinik değerlendirme sonucunda pozitif olan bulguların puanları toplanır."],
      statsThreeTier: [
        { pts: "0 - 1", risk: "Düşük Risk" },
        { pts: "2 - 6", risk: "Orta Risk" },
        { pts: "> 6", risk: "Yüksek Risk" }
      ],
      statsTwoTier: [
        { pts: "≤ 4", risk: "PE Olası Değil (d-dimer ile)" },
        { pts: "≥ 5", risk: "PE Olası (BT Anjiyo ile)" }
      ],
      degerlendirme: [
        { type: "p", text: "Orijinal Wells çalışması, PE prevalansının yüksek olduğu (yaklaşık %30) kohortlarda gerçekleştirilmiştir. Acil serviste yapılan iki ek çalışma bu aracı %9,5-%12 PE prevalansı ile doğrulamıştır." },
        { type: "p", text: "En büyük çalışma aşağıdaki risk sınıflandırmasını göstermiştir:" },
        { type: "ul", items: [
          "0-1 düşük puan: %1,3 prevalans.", 
          "2-6 orta puan: %16,2 prevalans.", 
          ">6 yüksek puan: %37,5 prevalans."
        ]},
        { type: "p", text: "Christopher çalışması Wells puanlama sistemini 2 kategoriye ayırmıştır:" },
        { type: "ul", items: [
          "4 veya daha düşük puan 'PE olası değil' olarak tanımlandı ve d-dimer ile test edildi.",
          "5 veya daha yüksek bir puan 'PE olası' olarak tanımlandı ve doğrudan BT Anjiyografiye (CTA) yönlendirildi.",
          "Genel PE görülme sıklığı 'olası değil' grubunda %12,1 iken, 'olası' grubunda %37,1 idi.",
          "Dimer negatif ise başka test yapılmadı.",
          "Dimer pozitif ise hasta CTA'ya yönlendirildi.",
          "CTA'ya giden tüm hastaların %20,4'ünde PE tanısı mevcuttu.",
          "'PE olası değil' grubunda, negatif dimer ile eve taburcu edilenlerde 3 aylık takipte gözden kaçan PE insidansı %0,5 idi."
        ]}
      ],
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Wells PS, Hirsh J, Anderson DR ve ark. Derin ven trombozunun klinik değerlendirmesinin doğruluğu. Lancet. 1995;345(8961):1326-30.", link:"https://www.ncbi.nlm.nih.gov/pubmed/7752753" },
        { kat: "Doğrulama", ref: "Scarvelis D, Wells PS. Derin ven trombozunun tanı ve tedavisi. CMAJ. 2006 24 Ekim;175(9):1087-92. İnceleme. Düzeltme: CMAJ. 2007 20 Kasım;177(11):1392.", link:"https://www.ncbi.nlm.nih.gov/pubmed/17060659" },
        { kat: "Diğer Referanslar", ref: "Wells PS, Owen C, Doucette S, Fergusson D, Tran H. Bu hastada derin ven trombozu var mı? JAMA. 2006 11 Ocak;295(2):199-207. İnceleme", link:"https://www.ncbi.nlm.nih.gov/pubmed/16403932" }
      ],
      creator: { name: "Dr. Philip S. Wells", title: "Hematoloji Profesörü", bio: "Ottawa Üniversitesi'nde Hematoloji Bölüm Başkanıdır. Venöz tromboembolizm teşhisinde dünyaca ünlü Wells skorlarının yaratıcısıdır." }
    }
  },
  {
    id: "gks",
    name: "Glasgow Koma Skalası (GCS)",
    description: "Bilinç düzeyi değerlendirmesi",
    category: "noroloji",
    type: "gks",
    interpret: [
      { max: 8, cls: "high", text: "Ağır yaralanma (GKS ≤ 8). Hava yolu koruması kritik." },
      { max: 12, cls: "mid", text: "Orta şiddetli yaralanma (GKS 9–12)." },
      { max: 15, cls: "low", text: "Hafif yaralanma (GKS 13–15)." },
    ],
    topInfo: {
      when: ["(Metin eklenecek...)"],
      pearls: ["(Metin eklenecek...)"],
      why: ["(Metin eklenecek...)"]
    },
    infoData: {
      renderType: "gks",
      tavsiye: [
        { text:"GCS skoru, hastanın ne kadar kritik durumda olduğunun göstergesi olabilir.", noBullet: true },
         "Glasgow Koma Ölçeği (GCS) değeri 15'in altında olan travma hastaları yakından izlenmeli ve yeniden değerlendirilmelidir.", 
         "Glasgow Koma Ölçeği'nde (GCS) düşüş her durumda endişe vericidir ve solunum yolunun değerlendirilmesini ve olası müdahaleyi gerektirmelidir.", 
        { text:"Öte yandan, 15'lik bir GCS skoru, hastanın (travma veya tıbbi) kritik durumda olmadığı anlamına gelmemelidir. Tedavi planlarının agresifliği hakkındaki kararlar, klinik tablo ve bağlam dikkate alınarak verilmeli ve hiçbir şekilde GCS skoru tarafından geçersiz kılınmamalıdır.", noBullet: true },
      ],
      yonetim:[
        { score: "GCS ≤ 8", cls: "bg-red-50 text-red-800 border-red-100", text: "Hava yolu koruması kritik. Entübasyon düşünülmelidir." },
        { score: "GCS 9–12", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Yakın izlem gereklidir. Hızlı düşüşte müdahale düşünün." },
        { score: "GCS 13–15", cls: "bg-green-50 text-green-800 border-green-100", text: "Hafif etkilenme. Klinik değerlendirme ile destekleyin." },
      ],
      kritikBaslik: "KRİTİK EYLEMLER",
      kritikMaddeler: [
        "GCS skoru yaygın olarak ve çeşitli ortamlarda benimsenmiş olsa da, nicel amaçlarla kullanılmak üzere tasarlanmamıştır.",
        "Akut dönemde klinik yönetim kararları yalnızca GCS skoruna dayandırılmamalıdır.",
      ],
      kritikAlinti: {
        metin: "GCS'nin tek başına, ne komayı izlemek ne de beyin hasarının şiddetini değerlendirmek veya sonucu tahmin etmek için kullanılmasını hiçbir zaman önermedik.",
        kaynak: "Teasdale 2014",
        link: "https://cdn.ps.emap.com/wp-content/uploads/sites/3/2014/10/141015Forty-years-on-updating-the-Glasgow-coma-scale.pdf",
      },
      formul: [
        "Glasgow Koma Skoru, aşağıda her bir bileşen (göz, sözel, motor) altında seçilen toplam puanların toplanmasıyla hesaplanır, örneğin '15 puan'.",
        "Glasgow Koma Ölçeği, 'E(4) V(5) M (6)' gibi bireysel bileşenlerden oluşmaktadır."
      ],
      stats: [
        { bileşen: "Göz", cevap: "Gözler kendiliğinden açılır.", puan: "+4" },
        { bileşen: "", cevap: "Sözlü komuta dair ufuk açıcı bir bakış açısı.", puan: "+3" },
        { bileşen: "", cevap: "Acıya dair göz açıcı bir deneyim.", puan: "+2" },
        { bileşen: "", cevap: "Göz açıcı değil", puan: "+1" },
        { bileşen: "", cevap: "Test edilemez*", puan: "NT" },
        { bileşen: "Sözlü", cevap: "Yönlendirilmiş", puan: "+5" },
        { bileşen: "", cevap: "Kafası karışmış", puan: "+4" },
        { bileşen: "", cevap: "Uygunsuz kelimeler", puan: "+3" },
        { bileşen: "", cevap: "Anlaşılmaz sesler", puan: "+2" },
        { bileşen: "", cevap: "Sözlü yanıt yok.", puan: "+1" },
        { bileşen: "", cevap: "Test edilemiyor/entübe edilemiyor*", puan: "NT" },
        { bileşen: "Motor", cevap: "Komutlara itaat eder.", puan: "+6" },
        { bileşen: "", cevap: "Ağrıyı lokalize eder.", puan: "+5" },
        { bileşen: "", cevap: "Ağrıdan uzaklaşma", puan: "+4" },
        { bileşen: "", cevap: "Ağrıya kadar bükülme", puan: "+3" },
        { bileşen: "", cevap: "Ağrının genişlemesi", puan: "+2" },
        { bileşen: "", cevap: "Motor tepki yok.", puan: "+1" },
        { bileşen: "", cevap: "Test edilemez*", puan: "NT" },
      ],
      degerlendirme: [
        "Modifiye Glasgow Koma Ölçeği (14 puanlık orijinal GCS Ölçeği'nin aksine, Glasgow'daki orijinal birim de dahil olmak üzere yaygın olarak benimsenen 15 puanlık ölçek), yatarak tedavi gören hastalarda zihinsel durumdaki değişiklikleri değerlendirmek ve iletmek ve koma süresini ölçmek için tekrarlanan bir şekilde kullanılmak üzere geliştirilmiştir (Teasdale 1974).",
        "Reith ve ark. tarafından yapılan sistematik bir incelemede, ölçeğin tekrarlanabilirliğine ilişkin 53 yayınlanmış rapordaki kanıtlar sentezlendi. Daha yüksek kaliteli çalışmalardaki bulguların %85'i, 0,6'nın üzerinde bir kappa istatistiği (k) standart kriterine göre değerlendirildiğinde önemli bir güvenilirlik gösterdi. Toplam GCS Puanının tekrarlanabilirliği de yüksekti ve gözlemlerin %77'sinde kappa 0,6'dan büyüktü. Ölçeğin kullanımına ilişkin eğitim ve öğretim, güvenilirlik üzerinde açık bir olumlu etki yarattı (Reith 2016).",
        "En yaygın kullanımında, ölçeğin üç bölümü genellikle şiddetin bir özetini sağlamak için toplanır. Yazarların kendileri de puanın bu şekilde kullanılmasına açıkça itiraz etmişlerdir ve analizler, aynı toplam puana sahip hastaların sonuçlarında, özellikle de ölüm oranlarında büyük farklılıklar olabileceğini göstermiştir (GCS puanı 4 olan bir hasta, göz, sözel ve motor için 1+1+2 olarak hesaplandığında %48, 1+2+1 olarak hesaplandığında %27, ancak 2+1+1 olarak hesaplandığında sadece %19 ölüm oranı öngörür (Healey 2014)).",
        "Özetle, Modifiye Glasgow Koma Ölçeği, akut beyin hasarı olan hastaları değerlendirmek için neredeyse evrensel olarak kabul görmüş bir yöntem sunmaktadır. Bileşenlerinin tek bir genel puana toplanması bilgi kaybına yol açar ve şiddet konusunda yalnızca kaba bir kılavuz sağlar. Bazı durumlarda, örneğin ciddi yaralanmaların erken triyajında, ölçeğin motor bileşeninin kısaltılmış bir versiyonunun, Basitleştirilmiş Motor Ölçeği'nde (SMS) olduğu gibi, değerlendirilmesi GCS kadar iyi sonuç verebilir ve önemli ölçüde daha az karmaşıktır. Bununla birlikte, SMS daha hafif yaralanmaları olan hastalarda daha az bilgilendirici olabilir."
      ],
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Teasdale G, Jennett B. Koma ve bozulmuş bilinç değerlendirmesi. Pratik bir ölçek. Lancet. 1974 13 Temmuz;2(7872):81-4.", link:"https://www.ncbi.nlm.nih.gov/pubmed/4136544" },
        { kat: "Doğrulama", ref: "Moore L, Lavoie A, Camden S, Le Sage N, Sampalis JS, Bergeron E, Abdous B. Glasgow Koma Skoru'nun istatistiksel doğrulanması. J Trauma. 2006 Haziran;60(6):1238-43.", link:"https://www.ncbi.nlm.nih.gov/pubmed/16766966" },
        { kat: "Doğrulama", ref: "Reith FC, Van den brande R, Synnot A, Gruen R, Maas AI. Glasgow Koma Ölçeğinin güvenilirliği: sistematik bir inceleme. Yoğun Bakım Tıbbı. 2016;42(1):3-15.", link:"https://www.ncbi.nlm.nih.gov/pubmed/26564211" },
        { kat: "Diğer Referanslar", ref: "Teasdale G, Jennett B. Koma ve beyin hasarının şiddetinin değerlendirilmesi. Anesteziyoloji. 1978;49:225-226.", link:"https://www.ncbi.nlm.nih.gov/pubmed/686455" },
        { kat: "Diğer Referanslar", ref: "Teasdale G, Jennett B, Murray L, Murray G. Glasgow koma ölçeği: toplamak ya da toplamamak. Lancet. 1983 Eylül 17;2(8351):678.", link:"https://www.ncbi.nlm.nih.gov/pubmed/6136811" }
      ],
      creator: { name: "Prof. Graham Teasdale & Prof. Bryan Jennett", title: "Nöroşirürji Uzmanları", bio: "Skala, 1974 yılında Glasgow Üniversitesi'nde kafa travması geçiren hastaların bilinç düzeyini standartlaştırmak amacıyla geliştirilmiştir." }
    }
  },
  {
    id: "bmi",
    name: "BMI Hesabı",
    description: "Vücut kitle indeksi",
    category: "genel",
    type: "bmi",
    interpret: [
      { max: 18.4, cls: "mid", text: "Zayıf (< 18.5). Beslenme desteği değerlendirin." },
      { max: 24.9, cls: "low", text: "Normal kilolu (18.5–24.9). Sağlıklı aralık." },
      { max: 29.9, cls: "mid", text: "Fazla kilolu (25–29.9). Yaşam tarzı değişikliği önerin." },
      { max: 99, cls: "high", text: "Obez (≥ 30). Kardiyovasküler ve metabolik risk artmış." },
    ],
    topInfo: {
      when: ["(Metin eklenecek...)"],
      pearls: ["(Metin eklenecek...)"],
      why: ["(Metin eklenecek...)"]
    },
    infoData: {
      renderType: "bmi",
      tavsiye: [
        "Zayıf veya aşırı kilolu olduğu tespit edilen hastalar için, uygun görüldüğü takdirde daha ileri beslenme veya fiziksel değerlendirmeler ve yönlendirmeler yapılmalıdır.",
        "Fazla kilolu veya obez teşhisi konulan kişilere diyet and egzersiz konusunda danışmanlık verilmelidir.",
        "Özellikle kemoterapi gibi ilaç dozlamasıyla ilgili durumlarda, tedavi sonuçlarını optimize etmek için vücut yüzey alanındaki değişikliklere bağlı olarak düzenli izleme ve doz ayarlamaları gereklidir."
      ],
      // Eski yonetimMetni ve kritikMetni alanlarının yerine bu diziyi ekle:
      kritikMaddeler: [
        "Tedavi, yalnızca BMI veya BSA ölçümlerine değil, bu değerler diğer vücut ölçümleri ve genel klinik tabloyla birlikte değerlendirilmelidir.",
        "Vücut Kitle İndeksi (BMI) ≥30 kg/m² olması tek başına obezite tanısı koymaya yeterlidir; başka bir doğrulama testi veya ölçüme gerek yoktur (Rubino ve ark., 2025)."
      ],
      formul: [
        "Vücut kitle indeksi, kg/m² = ağırlık, kg / (boy, m)²", 
        "Vücut yüzey alanı (Mosteller formülü), m² = [ Boy, cm × Ağırlık, kg / 3600 ]^½"
      ],
      statsBmi: [
        { bmi: "< 18.5", weight: "Zayıf" },
        { bmi: "18.5–24.9", weight: "Normal ağırlık" },
        { bmi: "25.0–29.9", weight: "Fazla kilolu*" },
        { bmi: "30.0–34.9", weight: "Obez 1. Sınıf*" },
        { bmi: "35.0–39.9", weight: "Obez 2. Sınıf" },
        { bmi: "≥ 40.0", weight: "Obez 3. Sınıf" }
      ],
      dipnot: "*Tipik sınıflandırma Asya popülasyonlarında obezite ile ilişkili kardiyovasküler hastalık riskini hafife alabileceğinden, DSÖ ve NIH gibi kuruluşlar bu bireyler için daha düşük BMI eşikleri önermektedir. Bu bağlamda, \"fazla kilolu\" olmak 23-24,9 kg/m² BMI ve \"obezite\" ise ≥25 kg/m² BMI olarak tanımlanmaktadır.",
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Gadzik J. 'How much should I weigh?' Quetelet's equation, upper weight limits, and BMI prime. Connecticut Medicine. (2006). 70 (2): 81–8. PMID 16768059.", link: "https://pubmed.ncbi.nlm.nih.gov/16768059/" },
        { kat: "Klinik Uygulama Kılavuzları", ref: "Rubino F, Cummings DE, Eckel RH, et al. Definition and diagnostic criteria of clinical obesity. Lancet Diabetes Endocrinol. 2025;13(3):221-262.", link: "https://pubmed.ncbi.nlm.nih.gov/39824205/" },
        { kat: "Diğer Referanslar", ref: "BMI Classification. Global Database on Body Mass Index. World Health Organization. 2006. Retrieved July 27, 2012.", link: "https://www.who.int/health-topics/obesity#tab=tab_1" },
        { kat: "Diğer Referanslar", ref: "Support Removal of BMI as a Standard Measure in Medicine and Recognizing Culturally-Diverse and Varied Presentations of Eating Disorders H-440.800. Retrieved March 17, 2025.", link:"https://policysearch.ama-assn.org/policyfinder/detail/bmi?uri=%2FAMADoc%2FHOD.xml-H-440.800.xml" },
        { kat: "Diğer Referanslar", ref: "Adult BMI Categories, Centers for Disease Control and Prevention. Retrieved March 16, 2025.", link:"https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" }
      ],
      creator: { name: "Adolphe Quetelet", title: "Matematikçi", bio: "BMI'ın temeli olan Quetelet İndeksi'ni 1832 yılında insan büyüme oranlarını tanımlamak için geliştirilmiştir." }
    }
  },
  {
    id: "epds",
    name: "Edinburgh Doğum Sonrası Depresyon Ölçeği (EPDS)",
    description: "Doğum sonrası dönemde depresyon taraması.",
    category: "kadin-dogum",
    type: "epds",
    items: [
      {
         label: "Geçen 7 gün içinde gülmeyi ve olayların komik tarafını görmeyi başardım",
        options: [
          { label: "Elimden geldiğince her zaman", pts: 0 },
          { label: "Şimdi durum eskisi kadar değil", pts: 1 },
          { label: "Şu an kesinlikle öyle değil", pts: 2 },
          { label: "Tam olarak değil", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde her şeyi büyük bir keyifle bekledim.",
        options: [
          { label: "Eskiden yaptığım kadar", pts: 0 },
          { label: "Eskisine göre biraz daha az", pts: 1 },
          { label: "Kesinlikle eskisine göre daha az", pts: 2 },
          { label: "Neredeyse hiç", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde işler ters gittiğinde kendimi gereksiz yere suçladım.",
        options: [
          { label: "Hayır,asla", pts: 0 },
          { label: "Çok sık değil", pts: 1 },
          { label: "Evet bazen", pts: 2 },
          { label: "Evet Çoğu zaman", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde hiçbir geçerli sebep olmadan endişeli veya kaygılı hissettim.",
        options: [
          { label: "Hayır,kesinlikle değil", pts: 0 },
          { label: "Neredeyse hiç", pts: 1 },
          { label: "Evet,bazen", pts: 2 },
          { label: "Evet çok sık", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde hiçbir geçerli sebep olmadan korku veya panik hissettim.",
        options: [
          { label: "Hayır,kesinlikle değil", pts: 0 },
          { label: "Hayır,pek değil", pts: 1 },
          { label: "Evet,bazen", pts: 2 },
          { label: "Evet,oldukça fazla", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde her şey üst üste gelmeye başladı.",
        options: [
          { label: "Hayır,her zamanki gibi iyi idare ediyorum", pts: 0 },
          { label: "Hayır,çoğu zaman gayet iyi başa çıktım", pts: 1 },
          { label: "Evet,bazen eskisi kadar iyi başa çıkamıyorum", pts: 2 },
          { label: "Evet,çoğu zaman hiç başa çıkamadım", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde o kadar mutsuzdum ki uyumakta zorlanıyordum.",
        options: [
          { label: "Hayır,kesinlikle değil", pts: 0 },
          { label: "Çok sık değil", pts: 1 },
          { label: "Evet,bazen", pts: 2 },
          { label: "Evet,çoğu zaman", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde üzgün ​​veya mutsuz hissettim.",
        options: [
          { label: "Hayır,kesinlikle değil", pts: 0 },
          { label: "Çok sık değil", pts: 1 },
          { label: "Evet,oldukça sık", pts: 2 },
          { label: "Evet,çoğu zaman", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde o kadar mutsuzdum ki ağlıyordum.",
        options: [
          { label: "Hayır,asla", pts: 0 },
          { label: "Sadece ara sıra", pts: 1 },
          { label: "Evet,oldukça sık", pts: 2 },
          { label: "Evet,çoğu zaman", pts: 3 },
        ],
      },
      {
        label: "Geçen 7 gün içinde kendime zarar verme düşüncesi aklıma geldi.",
        options: [
          { label: "Asla", pts: 0 },
          { label: "Neredeyse hiç", pts: 1 },
          { label: "Bazen", pts: 2 },
          { label: "Evet oldukça sık", pts: 3 },
        ],
      },
    ],
    interpret: [
      { max: 9, cls: "low", text: "Negatif" },
      { max: 99, cls: "high", text: "Pozitif, daha detaylı değerlendirme önerilir." },
    ],
    topInfo: {
      when: ["(Metin eklenecek...)"],
      pearls: ["(Metin eklenecek...)"],
      why: ["(Metin eklenecek...)"]
    },
    infoData: {
      renderType: "epds",
      tavsiye: [
        "10 ve üzeri puanlar pozitif tarama sonucu olarak kabul edilir. Hastanızı daha ileri psikiyatrik değerlendirme ve tedavi planı için yönlendirin.",
        "Bazı çalışmaların ve kurumların pozitif tarama sonucunu belirtmek için farklı bir eşik değeri kullanabileceğini unutmayın; yerel en iyi uygulamaları mutlaka öğrenin."
      ],
      yonetim: [
        { score: "0-9", cls: "bg-green-50 text-green-800 border-green-200", text: "Düşük risk; takipte kalın ve gerekirse destek sağlayın." },
        { score: "10 ve üzeri", cls: "bg-red-50 text-red-800 border-red-200", text: "Yüksek risk; psikiyatri/psikoloji değerlendirmesi önerilir." }
      ],
      formul: [
        "EPDS skoru, seçilen puanların toplanmasıyla hesaplanır:"
      ],
      statsEpds: [
        { q: "Gülmeyi ve olayların komik tarafını görmeyi başardım.", a: "Elimden geldiğince her zaman", p: 0 },
        { q: "", a: "Şimdi durum eskisi kadar değil.", p: 1 },
        { q: "", a: "Şu an kesinlikle öyle değil.", p: 2 },
        { q: "", a: "Tam olarak değil", p: 3 },
        { q: "Her şeyi büyük bir keyifle bekledim.", a: "Eskiden yaptığım kadar", p: 0 },
        { q: "", a: "Eskisine göre biraz daha az", p: 1 },
        { q: "", a: "Kesinlikle eskisine göre daha az", p: 2 },
        { q: "", a: "Neredeyse hiç", p: 3 },
        { q: "İşler ters gittiğinde kendimi gereksiz yere suçladım.", a: "Hayır, asla", p: 0 },
        { q: "", a: "Çok sık değil", p: 1 },
        { q: "", a: "Evet, bazen.", p: 2 },
        { q: "", a: "Evet, çoğu zaman", p: 3 },
        { q: "Hiçbir geçerli sebep olmadan endişeli veya kaygılı hissettim.", a: "Hayır, kesinlikle değil.", p: 0 },
        { q: "", a: "Neredeyse hiç", p: 1 },
        { q: "", a: "Evet, bazen", p: 2 },
        { q: "", a: "Evet, çok sık", p: 3 },
        { q: "Hiçbir geçerli sebep olmadan korku veya panik hissettim.", a: "Hayır, kesinlikle değil.", p: 0 },
        { q: "", a: "Hayır, pek değil.", p: 1 },
        { q: "", a: "Evet, bazen", p: 2 },
        { q: "", a: "Evet, oldukça fazla", p: 3 },
        { q: "Her şey üst üste gelmeye başladı.", a: "Hayır, her zamanki gibi iyi idare ediyorum.", p: 0 },
        { q: "", a: "Hayır, çoğu zaman gayet iyi başa çıktım.", p: 1 },
        { q: "", a: "Evet, bazen eskisi kadar iyi başa çıkamıyorum.", p: 2 },
        { q: "", a: "Evet, çoğu zaman hiç başa çıkamadım.", p: 3 },
        { q: "O kadar mutsuzdum ki uyumakta zorlanıyordum.", a: "Hayır, kesinlikle değil.", p: 0 },
        { q: "", a: "Çok sık değil", p: 1 },
        { q: "", a: "Evet, bazen", p: 2 },
        { q: "", a: "Evet, çoğu zaman", p: 3 },
        { q: "Üzgün veya mutsuz hissettim.", a: "Hayır, kesinlikle değil.", p: 0 },
        { q: "", a: "Çok sık değil", p: 1 },
        { q: "", a: "Evet, oldukça sık", p: 2 },
        { q: "", a: "Evet, çoğu zaman", p: 3 },
        { q: "O kadar mutsuzdum ki ağlıyordum.", a: "Hayır, asla", p: 0 },
        { q: "", a: "Sadece ara sıra", p: 1 },
        { q: "", a: "Evet, oldukça sık", p: 2 },
        { q: "", a: "Evet, çoğu zaman", p: 3 },
        { q: "Kendime zarar verme düşüncesi aklıma geldi.", a: "Asla", p: 0 },
        { q: "", a: "Neredeyse hiç", p: 1 },
        { q: "", a: "Bazen", p: 2 },
        { q: "", a: "Evet, oldukça sık", p: 3 }
      ],
      degerlendirmeEpds: [
        { score: "<10", result: "Negatif" },
        { score: "≥10", result: "Pozitif sonuç, daha detaylı değerlendirme önerilir." }
      ],
      degerlendirme: [
        "• EPDS tarama aracını sonuçları yalnızca bir başlangıç noktası olarak kullanın.",
        "• EPDS skoru <10 ise, tarama sonucunu düşük risk olarak yorumlayın, ancak klinik değerlendirme ve hasta geri bildirimlerini göz önünde bulundurun.",
        "• EPDS skoru ≥10 ise, pozitif sonuç olarak kabul edilir ve hastanızı daha ileri psikiyatrik değerlendirme ve tedavi planı için yönlendirin.",
      ],
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Cox JL, Holden JM, Sagovsky R. Doğum sonrası depresyonun tespiti. 10 maddelik Edinburgh doğum sonrası depresyon ölçeğinin geliştirilmesi. Br J Psychiatry. 1987;150:782-786.", link: "https://pubmed.ncbi.nlm.nih.gov/365173/" },
        { kat: "Doğrulama", ref: "Cox JL, Chapman G, Murray D, Jones P. Doğum sonrası depresyon ölçeğinin (EPDS) doğum yapmamış kadınlarda geçerliliği. J Affect Disord. 1996;39(3):185-189.", link: "https://pubmed.ncbi.nlm.nih.gov/8856422/" }
      ],
      creator: { name: "İZMİTLİ", title: "kocaeli ", bio: "kırkbir" }
    }
  },
  {
    id: "apgar",
    name: "APGAR Skoru",
    description: "Yenidoğanları doğumdan 1 ve 5 dakika sonra değerlendirir.",
    category: "kadin-dogum",
    type: "apgar",
    items: [
      {
        label: "Aktivite / Kas Tonusu",
        options: [
          { label: "Aktif", pts: 2 },
          { label: "Ekstremitelerde hafif fleksiyon", pts: 1 },
          { label: "Gevşek", pts: 0 },
        ]
      },
      {
        label: "Nabız",
        options: [
          { label: "≥100 BPM", pts: 2 },
          { label: "<100 BPM", pts: 1 },
          { label: "Yok", pts: 0 },
        ]
      },
      {
        label: "Yüz Buruşturma",
        options: [
          { label: "Hapşırma / Öksürme", pts: 2 },
          { label: "Yüz buruşturma", pts: 1 },
          { label: "Yok", pts: 0 },
        ]
      },
      {
        label: "Görünüm / Cilt Rengi",
        options: [
          { label: "Tamamen pembe", pts: 2 },
          { label: "Gövde pembe, ekstremiteler mor", pts: 1 },
          { label: "Mavi / Soluk", pts: 0 },
        ]
      },
      {
        label: "Solunum Çabası",
        options: [
          { label: "İyi / Ağlıyor", pts: 2 },
          { label: "Düzensiz / Yavaş", pts: 1 },
          { label: "Yok", pts: 0 },
        ]
      }
    ],
    interpret: [
      { max: 3, cls: "high", text: "Kritik derecede düşük. Acil müdahale gerektirir." },
      { max: 6, cls: "mid", text: "Oldukça düşük. Yakın takip gerekebilir." },
      { max: 10, cls: "low", text: "Genellikle normal." },
    ],
    topInfo: {
      when: [
        "Gebelik haftasına bakılmaksızın, canlı doğan her yenidoğana, yaşamın 1. ve 5. dakikalarında bu testi uygulayın.",
        "Yenidoğanın doğumundan 60 saniye sonra depresyonun en belirgin şekilde görüldüğü nokta olarak kabul edildi.",
        "Yenidoğan Canlandırma Programı (NRP) uyarınca, puanlama 7 puana ulaşılana veya 20 dakikalık yaşam süresine ulaşılana kadar 5 dakikalık aralıklarla devam eder.",
        "Belirtilen zamanda hastayla doğrudan teması olan herhangi bir sağlık çalışanı tarafından puanlandırılmıştır."
      ],
      pearls: [
        "Skorun tek başına canlandırma ihtiyacını belirlemek için kullanılmaması gerektiğini unutmayın.",
        "1. dakika skoru doğum sırasındaki akut durumu, 5. dakika skoru ise nörolojik gelişimi ve resüsitasyon başarısını yansıtır."
      ],
      why: [
        "Yenidoğanın doğum sonrası odadaki klinik durumunu standart ve hızlı bir şekilde sağlık personeline aktarmak amacıyla kullanılır."
      ]
    },
    infoData: {
      renderType: "apgar",
      tavsiye: [
        "Bu 5 kriter eşit öneme sahip değildir. Orijinal makalede kalp atış hızı ve solunum çabasının en önemli, rengin ise en az önemli olduğu belirtilmişti.",
        "Kullanım kolaylığını ve pratikliğini artırmak amacıyla, kriterlerde madde önemine göre ağırlıklandırma yapılmamıştır.",
        "5 dakikalık skor, hayatta kalma olasılığını daha iyi tahmin eden bir gösterge olarak kabul ediliyor.",
        "Amerikan Kadın Doğum ve Jinekologlar Kongresi (ACOG) ve Amerikan Pediatri Akademisi'nin (AAP) 1996'dan bu yana yayınladığı APGAR'ın Kullanımı ve Kötüye Kullanımı da dahil olmak üzere birçok yayın, APGAR'ın doğum asfiksisini ve nörolojik prognozu belirlemedeki sınırlılıklarını vurgulamıştır.",
        "≥5 dakikadaki 0-3 puan, hastalığın spesifik olmayan bir göstergesidir, ensefalopatinin ilk belirtilerinden biri olabilir ancak asfiksiye özgü değildir ( Pediatrics 2015 ).",
        "Asfiksi, ancak klinik durum ve laboratuvar verilerine dayanarak doğum sırasında veya doğumdan hemen sonra gaz değişiminin bozulduğuna dair kanıt varsa dikkate alınır.",
        "Endişe verici fetal kalp atışı izlemeleri, görüntüleme çalışmaları, EEG izlemeleri ve plasenta patolojisi tanıya yardımcı olabilir.",
        "5. ve 10. dakikalarda ≤5 puan alan kişilerde serebral palsi riski (20-100 kat) ve nörolojik sonuçlar kötüleşmektedir.",
        "Bu tür popülasyon riskleri herhangi bir birey için genelleştirilmemelidir."
      ],
      yonetim: [
        { score: "2014 tarihli Neonatal Ensefalopati ve Nörolojik Sonuç raporu, 5 dakikalık skoru 7-10 Puan arası", cls: "bg-green-50 text-green-800 border-green-100", text: "Güven verici" },
        { score: "4-6 Puan arası", cls: "bg-yellow-50 text-yellow-800 border-yellow-100", text: "Orta derecede anormal durum." },
        { score: "0-3 Puan arası", cls: "bg-red-50 text-red-800 border-red-100", text: "Düşük/Kritik durum." },
        ],
        kritikMaddeler: [
          "NRP protokolüne göre, canlandırma işlemine 1 dakikadan önce başlanmalıdır; bu nedenle APGAR skoru, ilk canlandırma veya özel müdahaleler için gerekliliği belirlememelidir.", 
          "5. dakikada skor ≤5 ise, göbek kordonu arterinden (UA) kan gazı örneği alınmalıdır.",
          "2015 ACOG/AAP yayınları ve 2011 NRP, 10. dakikada 0 puan alınmasının, kötü prognoz nedeniyle canlandırma çabalarına devam edilmesi gerekip gerekmediğine karar vermede yardımcı olabileceğini yinelemektedir.", 
          "Canlandırma sırasında elde edilen skor, kendiliğinden nefes alan yenidoğanın skorundan farklıdır.", 
          "Canlandırma sırasında genişletilmiş skor raporlaması teşvik edilmektedir (Pediatrics 2015).", 
        ],
      formul: [
        "Verilen puanların toplanması.",
        "• Her biri 0 (Yok), 1 (Orta Düzey) veya 2 (Var) olarak puanlanan 5 bağımsız madde.",
        "• Minimum puan = 0; maksimum puan = 10",
        "• \"Refleks İrritabilite\" için yapılan ilk testler, yüz buruşturma, hapşırma veya öksürmeyi tetiklemek amacıyla kauçuk kateterle burun ve orofaringeal aspirasyon uygulanmasını içeriyordu.",
        "• Daha sonra, ayağın tabanına hızlı ve teğetsel bir şekilde vurulmasının daha kolay ve etkili bir uyarıcı olduğu keşfedildi."
      ],
      degerlendirme: [
        {type: "p",text:"1953'teki orijinal seri, tek bir hastane merkezinden 1.021 yeni doğanı içeriyordu."},
        {type: "p",text:"Örneklem, herhangi bir anestezi yöntemi kullanılarak gerçekleştirilen kendiliğinden, aletli/cerrahi yardımlı doğum sonucu doğum ağırlığı >500 gram olan tüm canlı tekil/ikiz yenidoğanları içermiştir."},
        {type: "p", text: "Her değerlendirme noktası için iki değerlendirici kullanıldı." },
        {type: "ul", items  : [
        "Gözlemciler arası güvenilirliğe dair yayınlanmış bir ölçüm olmamasına rağmen, gözlemciler arasındaki değişkenlik yalnızca ±1 puandı.",
        "Varyasyon en çok hafif depresyon aralığında (yani 5-7) görüldü.",
        ]},
        {type: "p", text:"Puanların \"doğruluğunu\" değerlendirmek için örneklem 3 gruba ayrıldı. Kategorilere göre ölüm yüzdesi, 0-2 puan alanlarda %14, 3-7 puan alanlarda %1,1 ve 8-10 puan alanlarda %0,13 olarak belirlendi."},
        {type: "ul", items: [
        "Makalenin asıl amacı belirli bir zamandaki klinik durumu aktarmak olsa da, prognozdan da bahsetmiştir.",
        ]},
        {type: "p", text:"Apgar'ın 1958'deki İkinci Raporu, puanlama sistemini dahili olarak doğruladı ve 15.000'den fazla yenidoğanın üriner sistem kan gazı örnekleriyle karşılaştırdı."},
        {type: "ul", items: [
        "Ölüm oranları, ilk çalışmadakiyle benzer şekilde, puan kategorisine göre farklılık gösterdi.",
        "“Asfiksiye özgü kimyasal bulgularla” ilişkili daha düşük puanlar…",
        "Elde edilen sonuç puanı, özellikle canlandırma ihtiyacının belirlenmesinde oldukça faydalı olmuştur.",
        ]},
        {type: "p", text:"2001 yılında yapılan çalışma, orijinal ölçümün geçerliliğini 26 haftadan büyük gebelik haftasında doğan tekil bebeklerin 150.000'den fazla annesi üzerinde doğruladı.",},
        {type: "ul", items: [
        "Prematüre yenidoğanlarda, 5. dakika APGAR skoru 0-3 olanların, 7-10 skoru olanlara kıyasla yenidoğan ölüm riski 59 ( %95 güven aralığı 40-87) idi. Zamanında doğan yenidoğanlarda ise bu risk 1460 ( %95 güven aralığı 835-2555) idi.",
        "Gebelik haftası dikkate alındıktan sonra bile, 5. dakikadaki düşük APGAR skoru, yenidoğan ölüm riskinin artmasıyla anlamlı derecede ilişkiliydi.",
        "APGAR skoru, ürik asit kan gazındaki asidemi derecesinden daha iyi bir yenidoğan ölüm oranı belirleyicisiydi. 0-3 arası skorlar ve pH <7.0 değerleri, yenidoğan ölüm riskini neredeyse iki katına çıkarıyordu.",
        "0-3 puanları, tüm gebelik haftalarında erken ölümle (yani, yaşamın 24 saatinden sonra) anlamlı derecede ilişkiliydi.",
        "5. dakika skorları 0-3 olan term bebeklerde Hipoksik-İskemik Ensefalopati nedeniyle ölüm riski 13'tür ( %95 güven aralığı 3-58)."
        ]},
      ],
      edebiyat: [
        { kat: "Orijinal/Birincil Referans", ref: "Apgar V. Yenidoğan bebeğin değerlendirilmesi için yeni bir yöntem önerisi. Curr. Res. Anesth. Analg. 1953;32(4): 260–267. doi:10.1213/00000539-195301000-00041.", link: "https://pubmed.ncbi.nlm.nih.gov/13083014/" },
        { kat: "Doğrulama", ref: "Finster M, Wood M. Apgar skoru zamanın sınavından geçti. Anesteziyoloji. 2005;102 (4): 855–857. doi:10.1097/00000542-200504000-00022.", link: "https://pubmed.ncbi.nlm.nih.gov/15791116/" },
        { kat: "Diğer Referanslar", ref: "Apgar V, Holaday D, Stanley James L, ve diğerleri. Yenidoğan Bebeğin Değerlendirilmesi – İkinci Rapor. JAMA. 1958; 168(15): 1985-8." }
      ],
      creator: { name: "izmitli", title: "izmitli", bio: "dünyaca ünlü izmitli" }
    }
  },
  {
    id: "qtc-calc",
    name: "Düzeltilmiş QT Aralığı (QTc)",
    description: "Kalp atış hızındaki aşırı değerler için QT aralığını düzeltir.",
    category: "kardiyoloji",
    type: "qtc", // Yeni bir tip tanımlıyoruz
    topInfo: {
      when: [
        "EKG'de QT aralığı ölçüldüğünde (genellikle V5-V6 derivasyonlarında).",
        "Potansiyel olarak QT'yi uzatan ilaçlar (antipsikotikler, bazı antibiyotikler vb.) başlanmadan önce ve takipte.",
        "Elektrolit bozuklukları (hipokalsemi, hipomagnezemi) şüphesinde."
      ],
      pearls: [
        "Bazett formülü en yaygın olanıdır ancak kalp hızı >100 veya <60 olduğunda hatalı sonuçlar verebilir.",
        "Kalp hızı uç değerlerdeyse Fridericia veya Framingham formülleri daha güvenilirdir.",
        "U-dalgası varsa QT ölçümüne dahil edilmemelidir; QT, T dalgasının izoelektrik hatta döndüğü noktada biter."
      ],
      why: [
        "Uramış QT aralığı, Torsades de Pointes gibi ölümcül aritmiler için ciddi bir risk faktörüdür.",
        "QT aralığı kalp hızıyla ters orantılı değiştiği için, hıza göre 'düzeltilmiş' bir değer (QTc) üzerinden değerlendirme yapılmalıdır."
      ]
    },
    infoData: {
      yonetim: [
        { score: "Normal QTc Aralığı:", cls: "bg-green-50 border-green-100 text-green-800", text: "Erkeklerde <440 ms, Kadınlarda <460 ms." },
        { score: "Sınırda (Borderline):", cls: "bg-yellow-50 border-yellow-100 text-yellow-800", text: "Erkeklerde 440-470 ms, Kadınlarda 460-480 ms." },
        { score: "Uzamış QTc (Yüksek Risk):", cls: "bg-red-50 border-red-100 text-red-800", text: "Erkeklerde >470 ms, Kadınlarda >480 ms. 500 ms üzeri değerler Torsades de Pointes için kritik risk taşır." }
      ],
      kritikMaddeler: [
        "QTc >500 ms ise QT uzatan tüm ilaçları kesin veya dozunu azaltın.",
        "Magnezyum ve Potasyum seviyelerini kontrol edin ve optimize edin.",
        "Bradikardi varlığında QT aralığının doğal olarak uzayacağını unutmayın."
      ],
      
      kanitFormuller: [
        "RR aralığı = 60 / Kalp Atış Hızı (HR)",
        "Bazett Formülü: QTc = QT aralığı / √ (RR aralığı)",
        "Fridericia Formülü: QTc = QT aralığı / (RR aralığı)^(1/3)",
        "Framingham Formülü: QTc = QT aralığı + 154 x (1 - RR aralığı)",
        "Hodges Formülü: QTc = QT aralığı + 1.75 x [(60 / RR aralığı) − 60]",
        "Rautaharju Formülü: QTc = QT aralığı x (120 + HR) / 180"
      ],
      uzunQtSendromu: [
        "2022 ESC kılavuzları, uzun QT sendromu (edinilmiş dahil) teşhisi için kesme değerini semptomdan bağımsız olarak QTc ≥480 ms veya LQTS tanı skoru >3 veya ikincil nedenleri olmayan aritmik senkoplularda ≥460 ms olarak önermektedir.",
        "2013 uzman konsensüsü LQTS tanısı için şu kriterleri önermiştir:",
        "İkincil bir neden yokluğunda LQTS risk skorunun > 3.5 olması, ve/veya",
        "LQTS genlerinden birinde kesin patojenik mutasyon varlığı, veya",
        "Tekrarlanan 12 derivasyonlu EKG'de QTc >500 ms olması ve QT uzaması için ikincil neden bulunmaması.",
        "Açıklanamayan senkopu olan hastada tekrarlanan EKG'lerde QTc'nin 480-499 ms arasında olması durumunda, ikincil neden ve patojenik mutasyon yoksa uzun QT sendromu teşhisi konabilir.",
        "Daha uzun QTc hastayı artan torsades de pointes riskine sokar. QTc >500 ms olması özellikle yüksek torsades de pointes riskini gösterir."
      ],
      uzunQtNedenleri: [
        { kategori: "Elektrolit Anormallikleri", maddeler: ["Hipokalsemi", "Hipokalemi", "Hipomagnezemi"] },
        { kategori: "İçsel Kardiyak Nedenler", maddeler: ["Miyokardiyal iskemi", "Kalp durması sonrası", "Koroner arter hastalığı (KAH)", "Kardiyomiyopati", "Şiddetli bradikardi, yüksek dereceli AV blok", "Doğuştan uzun QT sendromu"] },
        { kategori: "Merkezi Nedenler", maddeler: ["Artmış kafa içi basıncı", "Otonomik disfonksiyon", "Hipotiroidizm", "Hipotermi"] },
        { kategori: "İlaçlar", maddeler: ["Anti-aritmikler", "Psikotropik ilaçlar", "Diğer ilaçlar"] }
      ],
      kisaQtSendromu: [
        "Nadir görülen kısa QT aralığı vakalarında, 2022 Avrupa kılavuzları QTc ≤360 ms ve şunlardan bir veya daha fazlasının varlığında kısa QT sendromu teşhisini önerir: Patojenik mutasyon, kısa QT sendromu aile öyküsü, kalp hastalığı olmaksızın ventriküler taşikardi veya fibrilasyon atağından sağ kurtulma.",
        "Aynı kılavuzlar, QTc ≤320 ms varlığında ve QTc'nin 320-360 ms arasında olup aritmik senkop ve <40 yaşında ani ölüm aile öyküsü olan durumlarda kısa QT sendromunun düşünülmesini önermektedir.",
        "Öte yandan 2013 uzman fikir birliği, QTc <330 ms varlığında SQTS teşhisi konmasını önerir.",
        "Ayrıca QTc <360 ms ve şunlardan birinin varlığında SQTS teşhisi konabilir: Patojenik mutasyon, SQTS aile öyküsü, <40 yaşında ani ölüm aile öyküsü, kalp hastalığı yokluğunda VT/VF atağından sağ kurtulma."
      ],
      degerlendirme: [
        {
          type: "ul",
          items: [
            "QT düzeltme formülleri, QT aralığı ile kalp atış hızı arasındaki ters korelasyonu düzeltmek için türetilmiştir. Tıp okullarında en çok öğretilen formül Bazett formülüdür. 1920'de Dr. H.C. Bazett'e dayandırılsa da, aslında Dr. A.D. Waller'ın 1891 denklemlerini uyarlamıştır.",
            "Fridericia, Hodges, Framingham ve Rautaharju formülleri 94 yıllık bir süre boyunca sırayla türetilmiştir (En eskisi Fridericia 1920, en yenisi Rautaharju 2014). Çoğu regresyon tabanlı yöntemlerle elde edilmiştir.",
            "QT aralığı düzeltmesi için ideal formül hakkında sürekli bir tartışma vardır. Bazı araştırmacılar Bazett formülünü doğrulamış olsa da, çoğu çalışma (Patel, Tian, Vandenberk) kalp hızına bağımlılığı ayarlama ve mortaliteyi tahmin etmede diğer formüllerin üstünlüğünü göstermiştir.",
            "Çoğu çalışmada Bazett'in yüksek kalp hızlarında QT'yi aşırı düzelttiği ve düşük hızlarda eksik düzelttiği, bunun da QT uzamasını ciddi oranda aşırı teşhis etme potansiyeli taşıdığı bulunmuştur (Vandenberk, Luo). Aynı nedenlerle, kısa QT teşhisi için de Bazett önerilmez.",
            "İki özel senaryo sık araştırılmıştır: 1) İlaç kaynaklı QT uzamasını izleme: QT nomogramının geliştirildiği çalışmada Bazett'in torsades de pointes riski altındakileri belirlemede faydalı olduğu bulunmuştur. Ancak Rautaharju formülünün de iyi performans gösterdiği bildirilmiştir. 2) Sporcularda ve gençlerde QT izleme: 2023 tarihli bir derleme, bu kişilerde Bazett'i destekleyen hiçbir çalışma bulmamış ve başta Fridericia olmak üzere alternatiflerin üstün olabileceğini belirtmiştir.",
            "Genel olarak ideal yöntem üzerinde net bir fikir birliği yoktur. 2013 uzman konsensüsü Bazett'e dayansa da, daha yeni 2022 Avrupa aritmi kılavuzları farklı bir formül önermektedir. Ayrıca QTc hesaplanırken taşikardi ve bradikardiden kaçınılması uyarısı yapılmıştır. Bazett yaygın olsa da, klinisyenler potansiyel eksikliklerinin farkında olmalıdır."
          ]
        }
      ],
      edebiyat: [
        { ref: "Taran LM, Szilagyi N. The duration of the electrical systole, Q-T, in acute rheumatic carditis in children. Am Heart J. 1947 Jan;33(1):14-26. doi: 10.1016/0002-8703(47)90421-3." },
        { ref: "Bazett HC. An analysis of the time-relations of electrocardiograms. Heart 1920; (7): 353–37." }
      ]
    }
  },
];