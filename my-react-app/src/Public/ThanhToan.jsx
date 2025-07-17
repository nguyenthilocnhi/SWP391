import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

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
  info: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
    textAlign: "left",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bold: { fontWeight: 500 },
  total: { fontWeight: "bold", fontSize: 18 },
  final: { color: "#1a3cff", fontWeight: "bold", fontSize: 18 },
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
};

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
  const [voucher, setVoucher] = useState(null);
  const [danhSachDichVu, setDanhSachDichVu] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const meetLink = location.state?.meetLink;

  useEffect(() => {
    const lichFromStorage = JSON.parse(localStorage.getItem("lichDat"))?.slice(-1)[0] || {};
    setLich(lichFromStorage);
    const tongTien = lichFromStorage.tongTien || lichFromStorage.gia || 100000;
    setSoTien(tongTien);
    setSoTienCuoi(tongTien);

    // Áp dụng voucher nếu có
    const v = JSON.parse(localStorage.getItem("activeVoucher"));
    if (v && !v.used) {
      const voucherInfo = voucherMap[v.code];
      if (voucherInfo) {
        let final = tongTien;
        if (voucherInfo.type === "percent") {
          final = tongTien * (1 - voucherInfo.discount / 100);
        } else if (voucherInfo.type === "fixed") {
          final = tongTien - voucherInfo.discount;
        }
        setVoucher(v);
        setSoTienCuoi(final > 0 ? final : 0);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchServices() {
      const token = localStorage.getItem('token');
      const [testRes, adviseRes] = await Promise.all([
        fetch('https://api-gender2.purintech.id.vn/api/Service/test-services', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json()),
        fetch('https://api-gender2.purintech.id.vn/api/Service/advise-services', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json())
      ]);
      const allServices = [
        ...(testRes?.obj || []).map(s => ({ id: s.id, name: s.testName })),
        ...(adviseRes?.obj || []).map(s => ({ id: s.id, name: s.consultationType || s.name }))
      ];
      setDanhSachDichVu(allServices);
    }
    fetchServices();
  }, []);

  const tenDichVu = lich.serviceName ||
    danhSachDichVu.find(s => String(s.id) === String(lich.maDichVu || lich.id || lich.adviceServiceId))?.name ||
    "Dịch vụ chưa xác định";

  const gioHen = lich.gio || "Chưa có giờ hẹn";

  const handleVnPay = async () => {
    const orderId = lich.id || Date.now().toString();
    const orderInfo = "Thanh toán dịch vụ";
    const amount = soTienCuoi;
    const customerEmail = lich.email || "";
    const customerPhone = lich.sdt || "";
    const returnFrontendUrl = window.location.origin + "/customer/thanh-cong-dat-lich";
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

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.h2}>Thanh toán dịch vụ</h2>
        <div style={styles.info}>
          <div style={styles.row}><span style={styles.bold}>Dịch vụ:</span> {tenDichVu}</div>
          <div style={styles.row}><span style={styles.bold}>Giờ hẹn:</span> {gioHen}</div>
          <div style={styles.row}><span style={styles.bold}>Giá gốc:</span> {soTien.toLocaleString('vi-VN')} VND</div>
          {voucher && (
            <div style={styles.row}>
              <span style={styles.bold}>Mã giảm:</span> {voucherMap[voucher.code]?.label || voucher.code}
            </div>
          )}
          <div style={styles.row}><span style={styles.total}>Tổng cộng:</span> <span style={styles.final}>{soTienCuoi.toLocaleString('vi-VN')} VND</span></div>
        </div>
        <button style={styles.btn} onClick={handleVnPay}>Thanh toán qua VNPAY</button>
      </div>
    </div>
  );
}

export default ThanhToan;
