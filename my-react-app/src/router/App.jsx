import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrangChu from "../Public/TrangChu";
import DangKy from "../Login/DangKy";
import DangNhap from "../Login/Dangnhap";
import XacThucOTP from "../Login/XacThucOTP";
import QuenMatKhau from "../Login/QuenMatKhau";
import GioiThieu from "../Public/GioiThieu";

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest */}
        <Route path="/" element={<TrangChu userType="guest" />} />
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/register" element={<DangKy />} />
        <Route path="/login" element={<DangNhap />} />
        <Route path="/forgot-password" element={<QuenMatKhau />} />
        <Route path="/verify-otp" element={<XacThucOTP />} />
        <Route path="/gioi-thieu" element={<GioiThieu userType="guest" />} />


        {/* Customer */}  
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/customer/gioi-thieu" element={<GioiThieu userType="customer" />} />
      </Routes>
    </Router>
  );
}

export default App;
