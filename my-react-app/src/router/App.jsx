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
import BlogPage from "../Public/BlogPage";
import BlogChiTiet1 from "../Public/BlogChiTiet1";
import BlogChiTiet2 from "../Public/BlogChiTiet2";
import BlogChiTiet3 from "../Public/BlogChiTiet3";
import BlogChiTiet4 from "../Public/BlogChiTiet4";
import BlogChiTiet5 from "../Public/BlogChiTiet5";
import BlogChiTiet6 from "../Public/BlogChiTiet6";
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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogchitiet1" element={<BlogChiTiet1 />} />
        <Route path="/blogchitiet2" element={<BlogChiTiet2 />} />
        <Route path="/blogchitiet3" element={<BlogChiTiet3 />} />
        <Route path="/blogchitiet4" element={<BlogChiTiet4 />} />
        <Route path="/blogchitiet5" element={<BlogChiTiet5 />} />
        <Route path="/blogchitiet6" element={<BlogChiTiet6 />} />

        {/* Customer */}  
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/customer/introduce" element={<GioiThieu userType="customer" />} />
        <Route path="/customer/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="customer" />} />
        <Route path="/customer/service" element={<DichVu userType="customer" />} />
        <Route path="/customer/blog" element={<BlogPage />} />
        <Route path="/customer/blogchitiet1" element={<BlogChiTiet1 />} />
        <Route path="/customer/blogchitiet2" element={<BlogChiTiet2 />} />
        <Route path="/customer/blogchitiet3" element={<BlogChiTiet3 />} />
        <Route path="/customer/blogchitiet4" element={<BlogChiTiet4 />} />
        <Route path="/customer/blogchitiet5" element={<BlogChiTiet5 />} />
        <Route path="/customer/blogchitiet6" element={<BlogChiTiet6 />} />
        <Route path="/customer/nhac-nho" element={<NhacNhoUongThuoc userType="customer" />} />
      </Routes>
    </Router>
  );
}

export default App;
