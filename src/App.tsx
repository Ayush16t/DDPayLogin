import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import PinPage from "@/pages/PinPage";
import SuccessPage from "@/pages/SuccessPage";
import AdminPage from "@/pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/pin" element={<PinPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
