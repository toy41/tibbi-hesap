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

// --- YARDIMCI BİLEŞEN (Odaklanma sorunu olmaması için BmiCalc'ın DIŞINA alındı) ---
const InputRow = ({ label, subLabel, value, onChange, unit, placeholder }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="mb-2 md:mb-0 md:mr-4 flex-1">
      <label className="text-gray-800 font-medium">{label}</label>
      {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
    </div>
    <div className="flex items-center w-full md:w-1/2 bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 outline-none text-gray-800"
      />
      <div className="bg-gray-50 px-4 py-2.5 border-l border-gray-300 text-sm text-gray-600 whitespace-nowrap min-w-[90px] text-center">
        {unit}
      </div>
    </div>
  </div>
);

// --- HER HESAPLAYICI İÇİN ÖZEL METİNLERİ BARINDIRAN SEKME BİLEŞENİ ---
function InfoTabs({ calcId }) {
  const [activeTab, setActiveTab] = useState("sonraki");

  const getTabContent = () => {
    switch (calcId) {
      case "gks":
        return {
          tavsiye: [
            "GCS skoru, hastanın ne kadar kritik durumda olduğunun göstergesi olabilir.",
            "Glasgow Koma Ölçeği (GCS) değeri 15'in altında olan travma hastaları yakından izlenmeli ve yeniden değerlendirilmelidir.",
            "Glasgow Koma Ölçeği'nde (GCS) düşüş her durumda endişe vericidir ve solunum yolunun değerlendirilmesini ve olası müdahaleyi gerektirmelidir.",
            "Öte yandan, 15'lik bir GCS skoru, hastanın (travma veya tıbbi) kritik durumda olmadığı anlamına gelmemelidir. Tedavi planlarının agresifliği hakkındaki kararlar, klinik tablo ve bağlam dikkate alınarak verilmeli ve hiçbir şekilde GCS skoru tarafından geçersiz kılınmamalıdır."
          ],
          yonetim: [], 
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
            { kat: "Orijinal/Birincil Referans", ref: "Teasdale G, Jennett B. Koma ve bozulmuş bilinç değerlendirmesi. Pratik bir ölçek. Lancet. 1974 13 Temmuz;2(7872):81-4.",link:"https://www.ncbi.nlm.nih.gov/pubmed/4136544" },
            { kat: "Doğrulama", ref: "Moore L, Lavoie A, Camden S, Le Sage N, Sampalis JS, Bergeron E, Abdous B. Glasgow Koma Skoru'nun istatistiksel doğrulanması. J Trauma. 2006 Haziran;60(6):1238-43.",link:"https://www.ncbi.nlm.nih.gov/pubmed/16766966" },
            { ref: "Reith FC, Van den brande R, Synnot A, Gruen R, Maas AI. Glasgow Koma Ölçeğinin güvenilirliği: sistematik bir inceleme. Yoğun Bakım Tıbbı. 2016;42(1):3-15.",link:"https://www.ncbi.nlm.nih.gov/pubmed/26564211" },
            { kat: "Diğer Referanslar", ref: "Teasdale G, Jennett B. Koma ve beyin hasarının şiddetinin değerlendirilmesi. Anesteziyoloji. 1978;49:225-226.",link:"https://www.ncbi.nlm.nih.gov/pubmed/686455" },
            { ref: "Teasdale G, Jennett B, Murray L, Murray G. Glasgow koma ölçeği: toplamak ya da toplamamak. Lancet. 1983 Eylül 17;2(8351):678.",link:"https://www.ncbi.nlm.nih.gov/pubmed/6136811" }
          ],
          creator: { name: "Prof. Graham Teasdale & Prof. Bryan Jennett", title: "Nöroşirürji Uzmanları", bio: "Skala, 1974 yılında Glasgow Üniversitesi'nde kafa travması geçiren hastaların bilinç düzeyini standartlaştırmak amacıyla geliştirilmiştir." }
        };
      case "wells-pe":
        return {
          tavsiye: [
            "Bazıları, düşük riskli kişileri tahmin etmek için klinik değerlendirmeden ziyade Wells skorunu kullanmayı ve ardından PERC kuralını uygulayarak pulmoner emboli (PE) araştırmalarını durdurmayı savunmaktadır.",
            "Tüm klinik karar destek araçlarında olduğu gibi, hekimin Wells kriterlerini uygulamaya geçmeden önce öncelikle tanıdan şüphelenmesi gerekir.",
            "Bu aracın asıl amacı, d-dimer testi yapılmasına gerek kalmayacak kadar düşük riskli olan kişileri belirlemekti.",
            "Yaşa göre ayarlanmış d-dimer eşik değerleri, düşük riskli hastalarda (rGeneva 'yüksek değil' veya Wells düşük) 50 yaş üstü hastalarda kullanım için doğrulanmıştır. Uygun d-dimer testini kullanıyorsanız, yaşa göre ayarlanmış d-dimer eşik değerini şu şekilde hesaplamayı düşünün: Yaş (yıl) × 10 µg/L = eşik değer (50 yaş üstü hastalar için).",
            "Hem iki hem de üç kademeli modeller kabul edilmekle birlikte, kılavuzlar yalnızca yüksek hassasiyetli d-dimer kullanan ve daha muhafazakar risk sınıflandırmasına dayanan iki kademeli modeli tercih ediyor gibi görünüyor; 'orta' riskli hastaların, daha fazla risk sınıflandırması yapılmadan değerlendirilmesi için hala çok yüksek riskli olduğu düşünülüyor."
          ],
          yonetim: [], 
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
            { kat: "Orijinal/Birincil Referans", ref: "Wells PS, Hirsh J, Anderson DR ve ark. Derin ven trombozunun klinik değerlendirmesinin doğruluğu. Lancet. 1995;345(8961):1326-30.",link:"https://www.ncbi.nlm.nih.gov/pubmed/7752753" },
            { kat: "Doğrulama", ref: "Scarvelis D, Wells PS. Derin ven trombozunun tanı ve tedavisi. CMAJ. 2006 24 Ekim;175(9):1087-92. İnceleme. Düzeltme: CMAJ. 2007 20 Kasım;177(11):1392.",link:"https://www.ncbi.nlm.nih.gov/pubmed/17060659" },
            { kat: "Diğer Referanslar", ref: "Wells PS, Owen C, Doucette S, Fergusson D, Tran H. Bu hastada derin ven trombozu var mı? JAMA. 2006 11 Ocak;295(2):199-207. İnceleme",link:"https://www.ncbi.nlm.nih.gov/pubmed/16403932" }
          ],
          creator: { name: "Dr. Philip S. Wells", title: "Hematoloji Profesörü", bio: "Ottawa Üniversitesi'nde Hematoloji Bölüm Başkanıdır. Venöz tromboembolizm teşhisinde dünyaca ünlü Wells skorlarının yaratıcısıdır." }
        };
      case "bmi":
        return {
          tavsiye: [
            "Zayıf veya aşırı kilolu olduğu tespit edilen hastalar için, uygun görüldüğü takdirde daha ileri beslenme veya fiziksel değerlendirmeler ve yönlendirmeler yapılmalıdır.",
            "Fazla kilolu veya obez teşhisi konulan kişilere diyet ve egzersiz konusunda danışmanlık verilmelidir.",
            "Özellikle kemoterapi gibi ilaç dozlamasıyla ilgili durumlarda, tedavi sonuçlarını optimize etmek için vücut yüzey alanındaki değişikliklere bağlı olarak düzenli izleme ve doz ayarlamaları gereklidir."
          ],
          yonetimMetni: "Tedavi, yalnızca BMI veya BSA ölçümlerine değil, bu değerler diğer vücut ölçümleri ve genel klinik tabloyla birlikte değerlendirilmelidir.",
          kritikMetni: "Vücut Kitle İndeksi (BMI) ≥30 kg/m² olması tek başına obezite tanısı koymaya yeterlidir ; başka bir doğrulama testi veya ölçüme gerek yoktur (",
          kritikLink: { text: "Rubino ve ark., 2025", url: "https://pubmed.ncbi.nlm.nih.gov/39824205/" },
          kritikMetniSon: ").",
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
            { ref: "Support Removal of BMI as a Standard Measure in Medicine and Recognizing Culturally-Diverse and Varied Presentations of Eating Disorders H-440.800. Retrieved March 17, 2025.",link:"https://policysearch.ama-assn.org/policyfinder/detail/bmi?uri=%2FAMADoc%2FHOD.xml-H-440.800.xml" },
            { ref: "Adult BMI Categories, Centers for Disease Control and Prevention. Retrieved March 16, 2025.", link:"https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" }
          ],
          creator: { name: "Adolphe Quetelet", title: "Matematikçi", bio: "BMI'ın temeli olan Quetelet İndeksi'ni 1832 yılında insan büyüme oranlarını tanımlamak için geliştirilmiştir." }
        };
      case "cha2ds2":
      default:
        return {
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
        };
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
            <ul className="space-y-2">
              {data.tavsiye.map((t, i) => {
                if (calcId === "gks" && (i === 1 || i === 2)) {
                  return <li key={i} className="ml-5 list-disc text-blue-800 text-sm leading-relaxed font-normal">{t}</li>;
                }
                if (calcId === "wells-pe" && i !== 0 && i !== data.tavsiye.length - 1) {
                   return <li key={i} className="ml-5 list-disc text-blue-800 text-sm leading-relaxed font-normal">{t}</li>;
                }
                if (calcId === "bmi") {
                   return <li key={i} className="ml-5 list-disc text-blue-800 text-sm leading-relaxed font-normal">{t}</li>;
                }
                return <li key={i} className="list-none text-blue-800 text-sm leading-relaxed font-normal">{t}</li>;
              })}
            </ul>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            {calcId === "gks" ? (
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
                    “GCS’nin tek başına, ne komayı izlemek ne de beyin hasarının şiddetini değerlendirmek veya sonucu tahmin etmek için kullanılmasını hiçbir zaman önermedik.” (
                    <a href="https://cdn.ps.emap.com/wp-content/uploads/sites/3/2014/10/141015Forty-years-on-updating-the-Glasgow-coma-scale.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Teasdale 2014</a>
                    )
                  </p>
                </div>
              </div>
            ) : calcId === "wells-pe" ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  
                  {/* Üç Katmanlı Model */}
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 underline">Üç Katmanlı Model</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-green-50 border-green-100">
                        <div className="font-bold mb-1 text-green-800">Hastanın düşük riskli olduğu belirlendi (&lt;2 puan: %1,3 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-green-700 mb-2">Pulmoner emboliyi ekarte etmek için d-dimer testi düşünülebilir. Alternatif olarak, PERC gibi bir ekarte etme kriteri düşünülebilir.</div>
                        <ul className="list-disc ml-5 text-sm text-green-700">
                          <li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li>
                          <li>Dimer pozitif ise CTA'yı değerlendirin.</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-100">
                        <div className="font-bold mb-1 text-yellow-800">Hastanın orta riskli olduğu belirlendi (2-6 puan arası skor, %16,2 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-yellow-700 mb-2">Yüksek hassasiyetli d-dimer testi veya BT anjiyografisi düşünülmelidir.</div>
                        <ul className="list-disc ml-5 text-sm text-yellow-700">
                          <li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li>
                          <li>Dimer pozitif ise CTA'yı değerlendirin.</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg border bg-red-50 border-red-100">
                        <div className="font-bold mb-1 text-red-800">Hastanın yüksek riskli olduğu belirlendi (skor &gt;6 puan: %37,5 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-red-700">BT anjiyografisi düşünülmelidir. D-dimer testi önerilmemektedir.</div>
                      </div>
                    </div>
                  </div>

                  {/* İki Katmanlı Model */}
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-2 underline">İki Katmanlı Model</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-green-50 border-green-100">
                        <div className="font-bold mb-1 text-green-800">Hastanın riski "PE olasılığı düşük" olarak belirlenmiştir (0-4 puan, %12,1 PE görülme sıklığı):</div>
                        <div className="text-sm leading-relaxed text-green-700 mb-2">Yüksek hassasiyetli d-dimer testi düşünülmelidir.</div>
                        <ul className="list-disc ml-5 text-sm text-green-700">
                          <li>Dimer negatif ise tetkiklerin durdurulmasını düşünün.</li>
                          <li>Dimer pozitif ise CTA'yı değerlendirin.</li>
                        </ul>
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
            ) : calcId === "bmi" ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">YÖNETMEK</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    {data.yonetimMetni}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1 uppercase">KRİTİK EYLEMLER</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    {data.kritikMetni}
                    <a href={data.kritikLink.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                      {data.kritikLink.text}
                    </a>
                    {data.kritikMetniSon}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">YÖNETMEK</h3>
                {data.yonetim.map((y, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${y.cls}`}>
                    <div className="font-bold mb-1">{y.score}</div>
                    <div className="text-sm leading-relaxed opacity-90">{y.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "kanit" && (
        <div className="space-y-8 animate-fade-in text-sm text-gray-700 text-left">
          
          {/* 1. FORMÜL ALANI (Tüm Hesaplayıcılar İçin Ortak) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2 border-b pb-1 uppercase tracking-wider text-xs">FORMÜL</h3>
            {data.formul.map((f, idx) => <p key={idx} className="leading-relaxed mb-2">{f}</p>)}
          </div>

          {/* 2. GERÇEKLER VE RAKAMLAR / TABLOLAR ALANI (Hesaplayıcıya Özel) */}
          {calcId === "gks" ? (
            <div>
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left bg-white text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr><th className="py-2.5 px-3 font-semibold">Bileşen</th><th className="py-2.5 px-3 font-semibold">Cevap</th><th className="py-2.5 px-3 font-semibold text-center">Puanlar</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.stats.map((s, i) => (
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
          ) : calcId === "wells-pe" ? (
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
                      {data.statsThreeTier.map((s, i) => (
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
                      {data.statsTwoTier.map((s, i) => (
                        <tr key={i}><td className="py-2.5 px-3 font-bold text-gray-900">{s.pts}</td><td className="py-2.5 px-3 text-gray-600">{s.risk}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : calcId === "bmi" ? (
            <div>
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Gerçekler ve Rakamlar</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left bg-white text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr><th className="py-2.5 px-3 font-semibold">BMI, kg/m²</th><th className="py-2.5 px-3 font-semibold">Ağırlık Durumu</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.statsBmi.map((s, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-3 font-bold text-gray-900 w-32">{s.bmi}</td>
                        <td className="py-2.5 px-3 text-gray-600">{s.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-500 mt-3 leading-relaxed italic">
                {data.dipnot}
              </p>
            </div>
          ) : (
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
          )}

          {/* 3. KANIT DEĞERLENDİRMESİ ALANI (Sadece GKS ve Wells'te var) */}
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

          {/* 4. EDEBİYAT ALANI (Tüm Hesaplayıcılar İçin Ortak, Linkleri Destekler) */}
          {data.edebiyat && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 uppercase tracking-wider text-xs">Edebiyat</h3>
              <div className="space-y-4">
                {data.edebiyat.map((ref, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{ref.kat}</div>
                    {ref.link ? (
                      <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-[13px] text-blue-600 leading-relaxed break-words hover:underline cursor-pointer block">
                        {ref.ref}
                      </a>
                    ) : (
                      <p className="text-[13px] text-blue-600 leading-relaxed break-words hover:underline cursor-pointer">
                        {ref.ref}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "icerik" && (
        <div className="animate-fade-in text-sm text-gray-700 border border-gray-100 p-5 rounded-xl bg-gray-50 text-left">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{data.creator.name}</h3>
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide font-semibold">{data.creator.title}</p>
          <p className="leading-relaxed mb-4">{data.creator.bio}</p>
          {data.creator.link && (
            <a href={data.creator.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium text-xs">
              Yayınlarını PubMed'de Görüntüle →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// 1. CHA2DS2 BİLEŞENİ
function Cha2ds2Calc({ calc }) {
  const [checked, setChecked] = useState({});
  const [age, setAge] = useState(null);
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
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm mb-5 text-center">
            <div className="text-5xl font-bold text-gray-800 mb-1">{result.score}</div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Toplam Puan</div>
            <div className={`p-3 rounded-lg text-sm font-medium ${riskStyle[result.interp.cls]}`}>
              {result.interp.text}
            </div>
          </div>
          <InfoTabs calcId={calc.id} />
        </div>
      )}
    </div>
  );
}

// 2. GKS BİLEŞENİ
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

// 3. CHECKLIST BİLEŞENİ
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
  const [hedefBmi, setHedefBmi] = useState("25");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(boy);
    const k = parseFloat(kilo);
    const hb = parseFloat(hedefBmi);
    if (!b || !k) return;

    const hm = b / 100;
    const bmi = k / (hm * hm);
    const bsa = Math.sqrt((b * k) / 3600); // Mosteller Formülü
    const targetW = hb ? (hb * hm * hm) : null;
    const interp = getInterp(calc.interpret, bmi);

    setResult({ bmi, bsa, targetW, hb, interp });
  };

  return (
    <div className="text-left">
      <div className="mb-6 border border-gray-200 rounded-xl px-4 py-1 bg-white shadow-sm">
        <InputRow 
          label="Ağırlık" 
          value={kilo} 
          onChange={(val) => { setKilo(val); setResult(null); }} 
          unit="kilogram" 
          placeholder="örn. 70" 
        />
        <InputRow 
          label="Yükseklik" 
          value={boy} 
          onChange={(val) => { setBoy(val); setResult(null); }} 
          unit="santimetre" 
          placeholder="örn. 185" 
        />
        <InputRow 
          label="Hedef BMI" 
          subLabel="İsteğe bağlı, hedef BMI'ye ulaşmak için gereken ağırlığı belirlemek için." 
          value={hedefBmi} 
          onChange={(val) => { setHedefBmi(val); setResult(null); }} 
          unit="kg/m²" 
          placeholder="25" 
        />
      </div>

      <button onClick={calculate} className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold shadow-sm hover:bg-blue-800 transition">
        Hesapla
      </button>
      
      {result && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row bg-[#10704c] text-white mb-6">
            <div className="flex-1 p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/20">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold">{result.bmi.toFixed(1)}</span>
                <span className="text-lg font-medium opacity-90">kg/m²</span>
              </div>
              <div className="text-sm font-medium opacity-90 leading-relaxed">
                Vücut Kitle İndeksi ({result.interp.text.split('(')[0].trim()})
              </div>
            </div>

            <div className="flex-1 p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/20">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold">{result.bsa.toFixed(2)}</span>
                <span className="text-lg font-medium opacity-90">m²</span>
              </div>
              <div className="text-sm font-medium opacity-90 leading-relaxed">
                Vücut Yüzey Alanı
              </div>
            </div>

            {result.targetW && (
              <div className="flex-1 p-5 md:p-6">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold">{result.targetW.toFixed(0)}</span>
                  <span className="text-lg font-medium opacity-90">kilogram</span>
                </div>
                <div className="text-sm font-medium opacity-90 leading-relaxed">
                  Vücut Kitle İndeksi (BMI) {result.hb} kg/m² olan kişiler için hedef kilo
                </div>
              </div>
            )}
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