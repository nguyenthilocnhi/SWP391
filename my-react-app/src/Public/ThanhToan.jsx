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
  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const meetLink = location.state?.meetLink;

  useEffect(() => {
    try {
      const lichFromStorage = JSON.parse(localStorage.getItem("lichDat"))?.slice(-1)[0] || {};
      console.log('Lịch từ localStorage:', lichFromStorage);
      
      setLich(lichFromStorage);
      
      // Xác định số tiền từ nhiều nguồn khác nhau
      let tongTien = 100000; // Giá mặc định
      
      if (lichFromStorage.tongTien) {
        tongTien = Number(lichFromStorage.tongTien);
      } else if (lichFromStorage.gia) {
        tongTien = Number(lichFromStorage.gia);
      } else if (lichFromStorage.amount) {
        tongTien = Number(lichFromStorage.amount);
      }
      
      // Đảm bảo số tiền hợp lệ
      if (isNaN(tongTien) || tongTien <= 0) {
        tongTien = 100000;
      }
      
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
    } catch (error) {
      console.error('Lỗi khi đọc dữ liệu từ localStorage:', error);
      // Sử dụng giá mặc định nếu có lỗi
      setSoTien(100000);
      setSoTienCuoi(100000);
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
    // Tạo orderId duy nhất
    const orderId = lich.id || `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderInfo = `Thanh toán dịch vụ: ${tenDichVu}`;
    const amount = Math.round(soTienCuoi); // Đảm bảo amount là số nguyên
    const customerEmail = lich.email || "";
    const customerPhone = lich.sdt || "";
    const returnFrontendUrl = window.location.origin + "/customer/thanh-cong-dat-lich";
    const token = localStorage.getItem('token');

    // Kiểm tra token
    if (!token) {
      alert('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }

    // Kiểm tra dữ liệu bắt buộc
    if (!orderId || !amount || amount <= 0) {
      alert('Dữ liệu thanh toán không hợp lệ!');
      return;
    }

    // Kiểm tra số tiền tối thiểu (VNPay yêu cầu ít nhất 1000 VND)
    if (amount < 1000) {
      alert('Số tiền thanh toán phải ít nhất 1.000 VND!');
      return;
    }

    const requestData = {
      orderId: orderId.toString(),
      orderInfo: orderInfo.substring(0, 255), // Giới hạn độ dài
      amount: amount,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      returnFrontendUrl: returnFrontendUrl
    };

    console.log('VnPay Request Data:', requestData);

    try {
      const res = await fetch('https://api-gender2.purintech.id.vn/api/VnPay/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      console.log('VnPay Response Status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('VnPay API Error:', errorData);
        
        // Xử lý các lỗi cụ thể
        if (res.status === 400) {
          throw new Error('Dữ liệu thanh toán không hợp lệ. Vui lòng kiểm tra lại thông tin.');
        } else if (res.status === 401) {
          throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        } else if (res.status === 403) {
          throw new Error('Không có quyền thực hiện thanh toán.');
        } else {
          throw new Error(errorData.message || `Lỗi server: ${res.status}`);
        }
      }

      const data = await res.json();
      console.log('VnPay Response Data:', data);
      
      if (data.paymentUrl) {
        // Thêm timeout để tránh lỗi CSP
        setTimeout(() => {
          try {
            window.location.href = data.paymentUrl;
          } catch (redirectError) {
            console.error('Lỗi chuyển hướng:', redirectError);
            // Fallback: mở trong tab mới
            window.open(data.paymentUrl, '_blank');
          }
        }, 100);
      } else {
        alert('Có lỗi khi tạo thanh toán VNPAY: Không nhận được payment URL');
      }
    } catch (e) {
      console.error('VnPay Error:', e);
      
      // Xử lý lỗi CSP và quyền thanh toán
      if (e.message.includes('CSP') || e.message.includes('permission')) {
        alert('Lỗi bảo mật trình duyệt. Vui lòng thử lại hoặc liên hệ hỗ trợ.');
      } else {
        alert(`Lỗi thanh toán VNPAY: ${e.message}`);
      }
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'vnpay') {
        await handleVnPay();
      } else {
        // Thanh toán thay thế - lưu thông tin và chuyển đến trang thành công
        const paymentInfo = {
          orderId: lich.id || `ORDER_${Date.now()}`,
          amount: soTienCuoi,
          service: tenDichVu,
          method: 'Chuyển khoản trực tiếp',
          status: 'Chờ xác nhận'
        };
        
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        navigate('/customer/thanh-cong-dat-lich');
      }
    } catch (error) {
      console.error('Payment Error:', error);
    } finally {
      setIsProcessing(false);
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
        
        {/* Phương thức thanh toán */}
        <div style={{marginTop: 20, textAlign: 'left'}}>
          <div style={{marginBottom: 10, fontWeight: 600, color: '#333'}}>Phương thức thanh toán:</div>
          <label style={{display: 'block', marginBottom: 8, cursor: 'pointer'}}>
            <input
              type="radio"
              name="paymentMethod"
              value="vnpay"
              checked={paymentMethod === 'vnpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{marginRight: 8}}
            />
            Thanh toán qua VNPAY (Khuyến nghị)
          </label>
          <label style={{display: 'block', marginBottom: 8, cursor: 'pointer'}}>
            <input
              type="radio"
              name="paymentMethod"
              value="direct"
              checked={paymentMethod === 'direct'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{marginRight: 8}}
            />
            Chuyển khoản trực tiếp
          </label>
        </div>
        
        <button 
          style={{
            ...styles.btn,
            opacity: isProcessing ? 0.7 : 1,
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }} 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Đang xử lý...' : 
           paymentMethod === 'vnpay' ? 'Thanh toán qua VNPAY' : 'Xác nhận thanh toán'}
        </button>
        
        {paymentMethod === 'direct' && (
          <div style={{
            marginTop: 15,
            padding: 10,
            backgroundColor: '#f0f9ff',
            borderRadius: 8,
            fontSize: 14,
            color: '#0369a1'
          }}>
            <strong>Thông tin chuyển khoản:</strong><br/>
            Ngân hàng: Vietcombank<br/>
            Số tài khoản: 1234567890<br/>
            Chủ tài khoản: PHÒNG KHÁM ABC<br/>
            Nội dung: {lich.id || 'Thanh toán dịch vụ'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ThanhToan;
