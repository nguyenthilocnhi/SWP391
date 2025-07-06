import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrangChu from "../Public/TrangChu";
import DangKy from "../Login/DangKy";
import DangNhap from "../Login/Dangnhap";
import XacThucOTP from "../Login/XacThucOTP";
import QuenMatKhau from "../Login/QuenMatKhau";
import GioiThieu from "../Public/GioiThieu";
import CauHoiThuongGap from "../Public/CauHoiThuongGap";
import DichVu from "../Public/DichVu";
import DatLaiMatKhauThanhCong from "../Login/DatLaiMatKhauThanhCong";
import NhacNhoUongThuoc from "../Public/NhacNhoUongThuoc";

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
        <Route path="/introduce" element={<GioiThieu userType="guest" />} />
        <Route path="/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="guest" />} />
        <Route path="/service" element={<DichVu userType="guest" />} />
        <Route path="/dat-lai-mat-khau-thanh-cong" element={<DatLaiMatKhauThanhCong />} />


        {/* Customer */}  
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/customer/introduce" element={<GioiThieu userType="customer" />} />
        <Route path="/customer/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="customer" />} />
        <Route path="/customer/service" element={<DichVu userType="customer" />} />
        <Route path="/customer/nhac-nho" element={<NhacNhoUongThuoc userType="customer" />} />
      </Routes>
    </Router>
  );
}

export default App;
