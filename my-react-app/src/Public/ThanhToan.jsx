import React, { useEffect, useState } from "react";

function ThanhToan() {
  const [danhSachDichVu, setDanhSachDichVu] = useState([]);
  const lich = JSON.parse(localStorage.getItem("lichDat"))?.slice(-1)[0] || {};
  const maDichVu = lich.maDichVu || lich.id || lich.adviceServiceId || "";
  const gioHen = lich.gio || "Chưa có giờ hẹn";
  const tongTien = lich.tongTien || lich.gia || 100000;

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

  // Ưu tiên lấy tên dịch vụ từ serviceName, sau đó tra cứu từ danh sách dịch vụ API với so sánh ép kiểu
  const tenDichVu = lich.serviceName ||
    danhSachDichVu.find(s => String(s.id) === String(lich.maDichVu || lich.id || lich.adviceServiceId))?.name ||
    "Dịch vụ chưa xác định";

  const handleVnPay = async () => {
    const orderId = lich.id || Date.now().toString();
    const orderInfo = "Thanh toán dịch vụ";
    const amount = tongTien;
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
    <div style={{ minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", background: "#f4f7fb" }}>
      <div style={{
        background: "#fff",
        padding: "40px 36px 32px 36px",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(26,60,255,0.10), 0 1.5px 6px rgba(0,0,0,0.04)",
        maxWidth: 420,
        width: "100%",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#1a3cff",
          fontSize: "1.6rem",
          marginBottom: 32,
          fontWeight: 700,
          letterSpacing: 0.5
        }}>
          Thanh toán dịch vụ
        </h2>
        <div style={{marginBottom: 24, fontSize: 17, color: '#222', textAlign: 'left'}}>
          <div><b>Tên dịch vụ:</b> {tenDichVu}</div>
          <div><b>Giờ hẹn:</b> {gioHen}</div>
          <div><b>Tổng số tiền:</b> {tongTien.toLocaleString('vi-VN')} VNĐ</div>
        </div>
        <button
          style={{
            padding: "16px 36px",
            background: "#1a3cff",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 20,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(26,60,255,0.08)",
            transition: "background 0.2s, box-shadow 0.2s"
          }}
          onClick={handleVnPay}
        >
          Thanh toán qua VNPAY
        </button>
      </div>
    </div>
  );
}

export default ThanhToan; 