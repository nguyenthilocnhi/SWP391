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
import BlogPage from "../Public/BlogPage";
import BlogChiTiet from "../Public/BlogChiTiet";

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
import AdminDanhGia from "../Admin/adminDanhGia";
import AdminBaiViet from "../Admin/adminBaiViet";
import AdminCaiDat from "../Admin/adminCaiDat";
import AdminQuanLyDichVu from "../Admin/adminQuanLyDichVu";
import AdminDangXuat from "../Admin/adminDangXuat";
import AdminPhanCong from "../Admin/AdminPhanCong";


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
        <Route path="/blog/:id" element={<BlogChiTiet userType="guest" />} />

        {/* Customer */}
        <Route path="/customer" element={<TrangChu userType="customer" />} />
        <Route path="/customer/introduce" element={<GioiThieu userType="customer" />} />
        <Route path="/customer/cau-hoi-thuong-gap" element={<CauHoiThuongGap userType="customer" />} />
        <Route path="/customer/service" element={<DichVu userType="customer" />} />
        <Route path="/customer/service/:serviceCode" element={<ChiTietDichVu userType="customer" />} />
        <Route path="/customer/tu-van-vien" element={<TuVanVien userType="customer" />} />
        <Route path="/customer/tu-van-vien/:id" element={<ChiTietTuVanVien userType="customer" />} />
        <Route path="/customer/blog" element={<BlogPage userType="customer" />} />
        <Route path="/customer/blog/:id" element={<BlogChiTiet userType="customer" />} />
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
        <Route path="/admin/taikhoan" element={<AdminTaiKhoan />} />
        <Route path="/admin/thongke" element={<AdminThongKe />} />
        <Route path="/admin/baiviet" element={<AdminBaiViet />} />
        <Route path="/admin/caidat" element={<AdminCaiDat />} />
        <Route path="/admin/dangxuat" element={<AdminDangXuat />} />
        <Route path="/admin/danh-gia" element={<AdminDanhGia />} />
        <Route path="/admin/quan-ly-dich-vu" element={<AdminQuanLyDichVu />} />
        <Route path="/admin/phan-cong" element={<AdminPhanCong />} />

        {/* Consultant */}
        <Route path="/consultant/trangchu" element={<ConsultantTrangChu />} />
        <Route path="/consultant/lich-lam-viec" element={<ConsultantLichLamViec />} />
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
