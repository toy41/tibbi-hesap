import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Calculator from "./page/Calculator";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc/:id" element={<Calculator />} />
      </Routes>
    </div>
  );
}