import React, { useEffect, useState, useRef } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    width: "100vw",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', Arial, sans-serif",
    margin: 0,
    padding: 0,
  },
  container: {
    background: "#fff",
    padding: "36px 36px 28px 36px",
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(26,60,255,0.10), 0 1.5px 6px rgba(0,0,0,0.04)",
    maxWidth: 430,
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
  },
  h2: {
    color: "#1a3cff",
    fontSize: "1.5rem",
    marginBottom: 18,
    fontWeight: 700,
  },
  qr: {
    margin: "18px 0 22px 0",
  },
  qrImg: {
    width: 210,
    height: 210,
    borderRadius: 12,
    border: "1.5px solid #e0e7ff",
    background: "#f8faff",
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
    textAlign: "left",
  },
  paymentSummary: {
    margin: "18px 0 10px 0",
    fontSize: 16,
    maxWidth: 350,
    marginLeft: "auto",
    marginRight: "auto",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bold: { fontWeight: 500 },
  discount: { color: "#00b386", fontWeight: 500 },
  total: { fontWeight: "bold", fontSize: 18 },
  final: { color: "#1a3cff", fontWeight: "bold", fontSize: 18 },
  bookingDetails: {
    background: "#f8faff",
    borderRadius: 10,
    padding: "15px 18px",
    margin: "18px 0 10px 0",
    textAlign: "left",
    fontSize: 15,
    boxShadow: "0 1.5px 6px rgba(26,60,255,0.04)",
  },
  bookingH3: {
    color: "#1a3cff",
    fontSize: 16,
    margin: "0 0 10px 0",
    fontWeight: 600,
  },
  bookingP: {
    margin: "5px 0",
    fontSize: 14,
  },
  label: { fontWeight: "bold", color: "#555" },
  note: { color: "#888", fontSize: 13, marginTop: 10 },
  btn: {
    display: "inline-block",
    marginTop: 18,
    padding: "10px 22px",
    background: "#1a3cff",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(26,60,255,0.08)",
    transition: "background 0.2s, box-shadow 0.2s",
    marginLeft: 0,
  },
  btnGreen: { background: "#28a745", marginLeft: 10 },
  btnBlue: { background: "#007bff", marginLeft: 10 },
  btnRed: { background: "#dc3545", marginLeft: 10 },
  badge: {
    marginLeft: 10,
    background: "#e0e7ff",
    color: "#1a3cff",
    borderRadius: 16,
    padding: "4px 14px",
    fontWeight: 600,
    fontSize: 15,
    verticalAlign: "middle",
    boxShadow: "0 1px 4px rgba(26,60,255,0.08)",
    border: "1px solid #c7d2fe",
    display: "inline-block",
  },
};

const bangGia = {
  "HIV Ag/Ab combo (HIV test thế hệ 4)": 200000,
  "Giang mai (RPR/TPHA)": 180000,
  "Lậu (PCR hoặc nhuộm soi)": 220000,
  "Chlamydia(PCR)": 210000,
  "HPV": 250000,
  "Virus Zika": 230000,
  "Pap smear": 190000,
  "Sùi mào gà(HPV tuýp nguy cơ thấp)": 240000,
  "Herpes Simplex Virus": 200000,
  "Hạ cam mềm": 170000,
  "Rận mu": 160000,
  "Tư Vấn Trực tiếp": 150000,
  "Tư Vấn Online": 100000,
};

function removeVietnameseTones(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const voucherMap = {
  "TU_VAN_VI_THANH_NIEN_10": {label: "🎁 Giảm 10% - Tư vấn vị thành niên", discount: 10, type: "percent"},
  "TU_VAN_SINH_SAN_100K": {label: "💰 Giảm 100.000VND - Tư vấn sức khỏe sinh sản", discount: 100000, type: "fixed"},
  "GIANG_MAI_20": {label: "🧪 Giảm 20% - Xét nghiệm Giang Mai", discount: 20, type: "percent"},
  "KHACH_LAN_DAU_50K": {label: "🎉 Giảm 50.000VND - Dành cho khách lần đầu", discount: 50000, type: "fixed"}
};

function ThanhToan() {
  const [lich, setLich] = useState({});
  const [soTien, setSoTien] = useState(100000);
  const [soTienCuoi, setSoTienCuoi] = useState(100000);
  const [noiDung, setNoiDung] = useState("THANHTOAN");
  const [voucher, setVoucher] = useState(null);
  const [voucherDetails, setVoucherDetails] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [timer, setTimer] = useState(300);
  const timerRef = useRef();

  useEffect(() => {
    // Lấy lịch đặt mới nhất
    const danhSach = JSON.parse(localStorage.getItem("lichDat")) || [];
    const lichMoiNhat = danhSach[danhSach.length - 1] || {};
    setLich(lichMoiNhat);

    // Xác định loại dịch vụ và hình thức
    let dichVu = lichMoiNhat.dichVu || "";
    let hinhThuc = lichMoiNhat.hinhThuc || "";
    let loaiXetNghiem = lichMoiNhat.loaiXetNghiem || "";
    let loaiTuVan = lichMoiNhat.loaiTuVan || "";
    let loai = "";
    let soTienTmp = 100000;
    let noiDungThanhToan = "THANHTOAN";
    if (dichVu === "Tư Vấn") {
      if (hinhThuc === "Trực tiếp") {
        loai = "Tư Vấn Trực tiếp";
        soTienTmp = bangGia[loai];
        noiDungThanhToan = loaiTuVan ? `${loaiTuVan} trực tiếp` : "Tư vấn sức khỏe trực tiếp";
      } else if (hinhThuc === "Online") {
        loai = "Tư Vấn Online";
        soTienTmp = bangGia[loai];
        noiDungThanhToan = loaiTuVan ? `${loaiTuVan} online` : "Tư vấn sức khỏe online";
      }
    } else if (loaiXetNghiem) {
      loai = loaiXetNghiem;
      soTienTmp = bangGia[loaiXetNghiem] || 100000;
      noiDungThanhToan = `Xét nghiệm ${loaiXetNghiem}`;
    }
    setSoTien(soTienTmp);
    setNoiDung(noiDungThanhToan);

    // Voucher
    const activeVoucher = localStorage.getItem('activeVoucher');
    let soTienFinal = soTienTmp;
    let voucherObj = null;
    let voucherDetail = "";
    let applied = false;
    if (activeVoucher) {
      voucherObj = JSON.parse(activeVoucher);
      // Kiểm tra điều kiện áp dụng
      let canApply = false;
      if (voucherObj.code === "TU_VAN_VI_THANH_NIEN_10" && dichVu === "Tư Vấn") canApply = true;
      else if (voucherObj.code === "TU_VAN_SINH_SAN_100K" && dichVu === "Tư Vấn") canApply = true;
      else if (voucherObj.code === "GIANG_MAI_20" && loaiXetNghiem === "Giang mai (RPR/TPHA)") canApply = true;
      else if (voucherObj.code === "KHACH_LAN_DAU_50K") {
        const lichSu = JSON.parse(localStorage.getItem("lichSuDatLich")) || [];
        if (lichSu.length === 0) canApply = true;
      }
      if (canApply && !voucherObj.used) {
        applied = true;
        if (voucherObj.type === "percent") {
          const discountAmount = Math.round(soTienTmp * (parseInt(voucherObj.discount) / 100));
          soTienFinal = soTienTmp - discountAmount;
          voucherDetail = `Giảm ${voucherObj.discount}% (-${discountAmount.toLocaleString('vi-VN')} VNĐ)`;
        } else if (voucherObj.type === "fixed") {
          const discountAmount = parseInt(voucherObj.discount);
          soTienFinal = Math.max(0, soTienTmp - discountAmount);
          voucherDetail = `Giảm ${discountAmount.toLocaleString('vi-VN')} VNĐ`;
        }
      }
    }
    setSoTienCuoi(soTienFinal);
    setVoucher(voucherObj);
    setVoucherDetails(voucherDetail);
    setVoucherApplied(applied);
  }, []);

  // Đếm ngược
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          alert('Đã hết thời gian thanh toán! Vui lòng đặt lại lịch.');
          window.location.href = '/customer/dat-lich-xet-nghiem';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Xử lý các nút
  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy thanh toán và quay lại đặt lịch?')) {
      window.location.href = '/customer/dat-lich-xet-nghiem';
    }
  };
  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrSrc();
    link.download = 'qr-vnpay.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handlePaid = () => {
    // Lưu lịch sử đặt lịch
    const danhSach = JSON.parse(localStorage.getItem("lichDat")) || [];
    const lichMoiNhat = danhSach[danhSach.length - 1];
    if (lichMoiNhat) {
      const lichSu = JSON.parse(localStorage.getItem("lichSuDatLich")) || [];
      lichSu.push({
        ngay: lichMoiNhat.ngay || "",
        dichVu: lichMoiNhat.loaiXetNghiem || lichMoiNhat.dichVu || "",
        lyDo: lichMoiNhat.lyDo || "",
        hoTen: lichMoiNhat.hoTen || "",
        sdt: lichMoiNhat.sdt || "",
        trangThai: "Đã xác nhận"
      });
      localStorage.setItem("lichSuDatLich", JSON.stringify(lichSu));
    }
    // Đánh dấu voucher đã dùng
    if (voucher) {
      voucher.used = true;
      localStorage.setItem('activeVoucher', JSON.stringify(voucher));
    }
    alert('Thanh toán thành công!');
    window.location.href = '/customer/thanh-cong-dat-lich';
  };
  const handleRemoveVoucher = () => {
    if (window.confirm('Bạn có chắc muốn xóa voucher này?')) {
      localStorage.removeItem('activeVoucher');
      window.location.reload();
    }
  };

  // Thêm hàm gọi VNPAY
  const handleVnPay = async () => {
    const orderId = lich.id || Date.now().toString();
    const orderInfo = noiDung || "Thanh toán dịch vụ";
    const amount = soTienCuoi || 100000;
    const customerEmail = lich.email || "";
    const customerPhone = lich.sdt || "";
    const returnFrontendUrl = window.location.origin;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://api-gender2.purintech.id.vn/api/VnPay/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId,
          orderInfo,
          amount,
          customerEmail,
          customerPhone,
          returnFrontendUrl
        })
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert('Có lỗi khi tạo thanh toán VNPAY!');
      }
    } catch (e) {
      alert('Lỗi kết nối VNPAY!');
    }
  };

  function qrSrc() {
    const noiDungKhongDau = removeVietnameseTones(noiDung);
    return `https://img.vietqr.io/image/970436-123456789-compact.png?amount=${soTienCuoi}&addInfo=${encodeURIComponent(noiDungKhongDau)}`;
  }

  // Định dạng thời gian đếm ngược
  function formatTimer(sec) {
    const min = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${min}:${s}`;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.h2}>Quét Mã QR để Thanh Toán</h2>
        <div style={styles.qr}>
          <img src={qrSrc()} alt="QR VNPAY" style={styles.qrImg} />
        </div>
        <div style={styles.info}>
          <p><strong>Số tiền:</strong> <span>{soTien.toLocaleString('vi-VN')} VNĐ</span></p>
          {voucherApplied && (
            <p><strong>Voucher:</strong> <span>{voucherDetails}</span></p>
          )}
          {voucherApplied && (
            <p><strong>Số tiền sau giảm giá:</strong> <span>{soTienCuoi.toLocaleString('vi-VN')} VNĐ</span></p>
          )}
          <p><strong>Nội dung:</strong> <span>{removeVietnameseTones(noiDung)}</span></p>
          <small style={{ color: '#666', fontStyle: 'italic' }}>💡 Chỉ có thể áp dụng 1 voucher tại một thời điểm</small>
        </div>
        <div style={styles.bookingDetails}>
          <h3 style={styles.bookingH3}>Chi tiết lịch đặt</h3>
          <p style={styles.bookingP}><span style={styles.label}>Ngày đặt:</span> {lich.ngay || "Ngày đặt chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Giờ đặt:</span> {lich.gio || "Giờ đặt chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Dịch vụ:</span> {lich.dichVu || "Dịch vụ chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Hình thức:</span> {lich.hinhThuc || "Hình thức chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Loại tư vấn:</span> {lich.loaiTuVan || "Loại tư vấn chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Lý do:</span> {lich.lyDo || "Lý do chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>Họ tên:</span> {lich.hoTen || "Họ tên chưa được cập nhật"}</p>
          <p style={styles.bookingP}><span style={styles.label}>SĐT:</span> {lich.sdt || "SĐT chưa được cập nhật"}</p>
        </div>
        <div style={styles.note}>
          Thời gian còn lại để thanh toán: <span>{formatTimer(timer)}</span>
        </div>
        <div>
          <button style={styles.btn} onClick={handleCancel}>Hủy</button>
          <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={handleDownloadQR}>Tải mã QR</button>
          <button style={{ ...styles.btn, ...styles.btnBlue }} onClick={handlePaid}>Tôi đã thanh toán</button>
          <button style={{ ...styles.btn, ...styles.btnBlue }} onClick={handleVnPay}>Thanh toán qua VNPAY</button>
          {voucherApplied && (
            <button style={{ ...styles.btn, ...styles.btnRed }} onClick={handleRemoveVoucher}>Xóa voucher</button>
          )}
        </div>
        {/* Badge mã giảm giá đang dùng */}
        {voucher && (
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <span style={styles.badge}>{voucherMap[voucher.code]?.label || voucher.code}</span>
          </div>
        )}
        {/* Tổng tiền */}
        <div style={styles.paymentSummary}>
          <div style={styles.row}>
            <span>Tổng tiền</span>
            <span style={styles.bold}>{soTien.toLocaleString('vi-VN')}</span>
          </div>
          {voucherApplied && (
            <div style={styles.row}>
              <span>Giảm giá</span>
              <span style={styles.discount}>-{(soTien - soTienCuoi).toLocaleString('vi-VN')}</span>
            </div>
          )}
          <div style={{ ...styles.row, ...styles.total }}>
            <span>Tổng tiền thanh toán</span>
            <span style={styles.final}>{soTienCuoi.toLocaleString('vi-VN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThanhToan; 