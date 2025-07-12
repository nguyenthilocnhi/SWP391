import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{/* Login */}
import DangNhap from "../Login/Dangnhap";
import DangKy from "../Login/DangKy";
import QuenMatKhau from "../Login/QuenMatKhau";
import XacThucOTP from "../Login/XacThucOTP";
import DatLaiMatKhauThanhCong from "../Login/DatLaiMatKhauThanhCong";

{/* Public là các trang chung của Guest và Customer */}
import TrangChu from "../Public/TrangChu";
import GioiThieu from "../Public/GioiThieu";
import CauHoiThuongGap from "../Public/CauHoiThuongGap";
import DichVu from "../Public/DichVu";
import ChiTietDichVu from "../Public/ChiTietDichVu";
import TuVanVien from "../Public/TuVanVien";
import ChiTietTuVanVien from "../Public/ChiTietTuVanVien";

{/* Blog */}
import BlogPage from "../Public/BlogPage";
import BlogChiTiet1 from "../Public/BlogChiTiet1";
import BlogChiTiet2 from "../Public/BlogChiTiet2";
import BlogChiTiet3 from "../Public/BlogChiTiet3";
import BlogChiTiet4 from "../Public/BlogChiTiet4";
import BlogChiTiet5 from "../Public/BlogChiTiet5";
import BlogChiTiet6 from "../Public/BlogChiTiet6";
import BlogChiTiet7 from "../Public/BlogChiTiet7";
import BlogChiTiet8 from "../Public/BlogChiTiet8";
import BlogChiTiet9 from "../Public/BlogChiTiet9";
import BlogChiTiet10 from "../Public/BlogChiTiet10";
import BlogChiTiet11 from "../Public/BlogChiTiet11";
import BlogChiTiet12 from "../Public/BlogChiTiet12";

{/* Customer */}
import NhacNhoUongThuoc from "../Public/NhacNhoUongThuoc";
import TheoDoiChuKy from "../Public/TheoDoiChuKy";
import CaiDat from "../Public/CaiDat";
import DoiMatKhau from "../Public/DoiMatKhau";
import DatCauHoi from "../Public/DatCauHoi";
import LichSuCauHoi from "../Public/LichSuCauHoi";
import DatLichDichVu from "../Public/DatLichDichVu";
import DatLichTuVan from "../Public/DatLichTuVan";
import DatLichXetNghiem from "../Public/DatLichXetNghiem";
import ThanhToan from "../Public/ThanhToan";
import ThanhCongDatLich from "../Public/ThanhCongDatLich";
import LichSuDatLich from "../Public/LichSuDatLich";
import LichSuDichVuVaDanhGia from "../Public/LichSuDichVuVaDanhGia";
import DanhGiaDichVu from "../Public/DanhGiaDichVu";
import ThongTinCaNhan from "../Public/ThongTinCaNhan";
import KetQuaXetNghiem from "../Public/KetQuaXetNghiem";
import DanhGiaDaGui from "../Public/DanhGiaDaGui";

{/* Admin */}
import AdminTrangChu from "../Admin/adminTrangChu";
import AdminTaiKhoan from "../Admin/adminTaiKhoan";
import AdminThongKe from "../Admin/adminThongKe";
import AdminTuVan from "../Admin/adminTuVan";
import AdminDanhGia from "../Admin/adminDanhGia";
import AdminBaiViet from "../Admin/adminBaiViet";
import AdminCaiDat from "../Admin/adminCaiDat";
import AdminQuanLyDichVu from "../Admin/adminQuanLyDichVu";
import AdminDangXuat from "../Admin/adminDangXuat";


{/* Staff */}
import StaffTrangChu from "../Staff/StaffTrangChu";
import StaffLichLamViec from "../Staff/StaffLichLamViec";
import StaffQuanLyDatLich from "../Staff/StaffQuanLyDatLich";
import StaffTraKetQua from "../Staff/StaffTraKetQua";
import StaffDanhGia from "../Staff/StaffDanhGia";
import StaffCaiDat from "../Staff/StaffCaiDat";
import StaffHoTro from "../Staff/StaffHoTro";
import StaffDangXuat from "../Staff/StaffDangXuat";

{/* Consultant */}
import ConsultantTrangChu from "../Consultant/ConsultantTrangChu";
import ConsultantLichLamViec from "../Consultant/ConsultantLichLamViec";
import ConsultantTuVanTrucTuyen from "../Consultant/ConsultantTuVanTrucTuyen";
import ConsultantLichHen from "../Consultant/ConsultantLichHen";
import ConsultantHoiDap from "../Consultant/ConsultantHoiDap";
import ConsultantReply from "../Consultant/ConsultantReply";
import ConsultantDanhGia from "../Consultant/ConsultantDanhGia";
import ConsultantCaiDat from "../Consultant/ConsultantCaiDat";
import ConsultantHoTro from "../Consultant/ConsultantHoTro";
import ConsultantDangXuat from "../Consultant/ConsultantDangXuat";
import ConsultantVietBlog from "../Consultant/ConsultantVietBlog";
import ConsultantBaiVietCuaToi from "../Consultant/ConsultantBaiVietCuaToi";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<DangNhap />} />
        <Route path="/register" element={<DangKy />} />
        <Route path="/forgot-password" element={<QuenMatKhau />} />
        <Route path="/verify-otp" element={<XacThucOTP />} />
        <Route path="/dat-lai-mat-khau-thanh-cong" element={<DatLaiMatKhauThanhCong />} />

        {/* Guest */}
        <Route path="/" element={<TrangChu userType="guest" />} />
        <Route path="/introduce" element={<GioiThieu userType="guest" />} />
        <Route path="/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="guest" />} />
        <Route path="/service" element={<DichVu userType="guest" />} />
        <Route path="/service/:serviceCode" element={<ChiTietDichVu userType="guest" />} />
        <Route path="/tu-van-vien" element={<TuVanVien userType="guest" />} />
        <Route path="/tu-van-vien/:id" element={<ChiTietTuVanVien userType="guest" />} />
        <Route path="/blog" element={<BlogPage userType="guest" />} />
        <Route path="/blogchitiet1" element={<BlogChiTiet1 userType="guest" />} />
        <Route path="/blogchitiet2" element={<BlogChiTiet2 userType="guest" />} />
        <Route path="/blogchitiet3" element={<BlogChiTiet3 userType="guest" />} />
        <Route path="/blogchitiet4" element={<BlogChiTiet4 userType="guest" />} />
        <Route path="/blogchitiet5" element={<BlogChiTiet5 userType="guest" />} />
        <Route path="/blogchitiet6" element={<BlogChiTiet6 userType="guest" />} />
        <Route path="/blogchitiet7" element={<BlogChiTiet7 userType="guest" />} />
        <Route path="/blogchitiet8" element={<BlogChiTiet8 userType="guest" />} />
        <Route path="/blogchitiet9" element={<BlogChiTiet9 userType="guest" />} />
        <Route path="/blogchitiet10" element={<BlogChiTiet10 userType="guest" />} />
        <Route path="/blogchitiet11" element={<BlogChiTiet11 userType="guest" />} />
        <Route path="/blogchitiet12" element={<BlogChiTiet12 userType="guest" />} />

        {/* Customer */}
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/customer/introduce" element={<GioiThieu userType="customer" />} />
        <Route path="/customer/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="customer" />} />
        <Route path="/customer/service" element={<DichVu userType="customer" />} />
        <Route path="/customer/service/:serviceCode" element={<ChiTietDichVu userType="customer" />} />
        <Route path="/customer/tu-van-vien" element={<TuVanVien userType="customer" />} />
        <Route path="/customer/tu-van-vien/:id" element={<ChiTietTuVanVien userType="customer" />} />
        <Route path="/customer/blog" element={<BlogPage userType="customer" />} />
        <Route path="/customer/blogchitiet1" element={<BlogChiTiet1 userType="customer" />} />
        <Route path="/customer/blogchitiet2" element={<BlogChiTiet2 userType="customer" />} />
        <Route path="/customer/blogchitiet3" element={<BlogChiTiet3 userType="customer" />} />
        <Route path="/customer/blogchitiet4" element={<BlogChiTiet4 userType="customer" />} />
        <Route path="/customer/blogchitiet5" element={<BlogChiTiet5 userType="customer" />} />
        <Route path="/customer/blogchitiet6" element={<BlogChiTiet6 userType="customer" />} />
        <Route path="/customer/blogchitiet7" element={<BlogChiTiet7 userType="customer" />} />
        <Route path="/customer/blogchitiet8" element={<BlogChiTiet8 userType="customer" />} />
        <Route path="/customer/blogchitiet9" element={<BlogChiTiet9 userType="customer" />} />
        <Route path="/customer/blogchitiet10" element={<BlogChiTiet10 userType="customer" />} />
        <Route path="/customer/blogchitiet11" element={<BlogChiTiet11 userType="customer" />} />
        <Route path="/customer/blogchitiet12" element={<BlogChiTiet12 userType="customer" />} />
        <Route path="/customer/nhac-nho" element={<NhacNhoUongThuoc userType="customer" />} />
        <Route path="/customer/theo-doi-chu-ky" element={<TheoDoiChuKy userType="customer" />} />
        <Route path="/customer/cai-dat" element={<CaiDat />} />
        <Route path="/customer/doi-mat-khau" element={<DoiMatKhau />} />
        <Route path="/customer/dat-cau-hoi" element={<DatCauHoi />} />
        <Route path="/customer/lich-su-cau-hoi" element={<LichSuCauHoi />} />
        <Route path="/customer/dat-lich-dich-vu" element={<DatLichDichVu />} />
        <Route path="/customer/dat-lich-tu-van" element={<DatLichTuVan />} />
        <Route path="/customer/dat-lich-xet-nghiem" element={<DatLichXetNghiem />} />
        <Route path="/customer/thanh-toan" element={<ThanhToan />} />
        <Route path="/customer/thanh-cong-dat-lich" element={<ThanhCongDatLich />} />
        <Route path="/customer/lich-su-dat-lich" element={<LichSuDatLich />} />
        <Route path="/customer/thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
        <Route path="/customer/ket-qua-xet-nghiem" element={<KetQuaXetNghiem />} />
        <Route path="/customer/lich-su-dich-vu-va-danh-gia" element={<LichSuDichVuVaDanhGia />} />
        <Route path="/customer/danh-gia-dich-vu" element={<DanhGiaDichVu />} />
        <Route path="/customer/danh-gia-da-gui" element={<DanhGiaDaGui />} />

        {/* Staff */}
        <Route path="/staff/trangchu" element={<StaffTrangChu />} />
        <Route path="/staff/lich-lam-viec" element={<StaffLichLamViec />} />
        <Route path="/staff/quan-ly-dat-lich" element={<StaffQuanLyDatLich />} />
        <Route path="/staff/tra-ket-qua" element={<StaffTraKetQua />} />
        <Route path="/staff/danh-gia" element={<StaffDanhGia />} />
        <Route path="/staff/cai-dat" element={<StaffCaiDat />} />
        <Route path="/staff/ho-tro" element={<StaffHoTro />} />
        <Route path="/staff/dang-xuat" element={<StaffDangXuat />} />

        {/* Admin */}
        <Route path="/admin/trangchu" element={<AdminTrangChu />} />
        <Route path="/admin/khachhang" element={<AdminTaiKhoan />} />
        <Route path="/admin/thongke" element={<AdminThongKe />} />
        <Route path="/admin/tuvan" element={<AdminTuVan />} />
        <Route path="/admin/baiviet" element={<AdminBaiViet />} />
        <Route path="/admin/caidat" element={<AdminCaiDat />} />
        <Route path="/admin/dangxuat" element={<AdminDangXuat />} />
        <Route path="/admin/danh-gia" element={<AdminDanhGia />} />
        <Route path="/admin/quan-ly-dich-vu" element={<AdminQuanLyDichVu />} />

        {/* Consultant */}
        <Route path="/consultant/trangchu" element={<ConsultantTrangChu />} />
        <Route path="/consultant/lich-lam-viec" element={<ConsultantLichLamViec />} />
        <Route path="/consultant/tu-van-truc-tuyen" element={<ConsultantTuVanTrucTuyen />} />
        <Route path="/consultant/lich-hen" element={<ConsultantLichHen />} />
        <Route path="/consultant/hoi-dap" element={<ConsultantHoiDap />} />
        <Route path="/consultant/hoi-dap/tra-loi/:id" element={<ConsultantReply />} />
        <Route path="/consultant/danh-gia" element={<ConsultantDanhGia />} />
        <Route path="/consultant/cai-dat" element={<ConsultantCaiDat />} />
        <Route path="/consultant/ho-tro" element={<ConsultantHoTro />} />
        <Route path="/consultant/dang-xuat" element={<ConsultantDangXuat />} />
        <Route path="/consultant/viet-blog" element={<ConsultantVietBlog />} />
        <Route path="/consultant/bai-viet-cua-toi" element={<ConsultantBaiVietCuaToi />} />
      </Routes>
    </Router>
  );
}

export default App;
