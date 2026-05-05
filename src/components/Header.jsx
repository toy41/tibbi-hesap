import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-800 text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-md">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex items-center gap-2"
      >
        <div className="bg-white text-blue-800 font-bold text-sm w-8 h-8 rounded-lg flex items-center justify-center">
          TH
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight">Tıbbi Hesaplayıcı</div>
          <div className="text-blue-200 text-xs leading-tight">Klinik karar destek</div>
        </div>
      </div>
    </div>
  );
}