import React, { useEffect, useState } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.main`
  min-height: 100vh;
  width: 100vw;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
const AlertBox = styled.div`
  position: fixed;
  top: 95px;
  right: 20px;
  background-color: #10b981;
  color: white;
  padding: 3px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
const HistoryContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  background: white;
  padding: 40px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(16,185,129,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* Form xích xuống */
`;
const Title = styled.h2`
  text-align: center;
  color: #047857;
  margin-bottom: 30px;
`;
const FilterBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  align-self: flex-start; /* Nằm sát trái form */
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  padding: 12px 15px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  background-color: #d1fae5;
  color: #065f46;
`;
const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
`;
const Tr = styled.tr`
  &:hover { background-color: #f0fdf4; }
`;
const DeleteBtn = styled.button`
  background-color: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(239,68,68,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background-color: #dc2626;
    box-shadow: 0 4px 16px rgba(239,68,68,0.15);
  }
`;
const ReviewBtn = styled.button`
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 8px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background-color: #2563eb;
    box-shadow: 0 4px 16px rgba(59,130,246,0.15);
  }
`;
const Status = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.85rem;
  background-color: ${({ type }) =>
    type === 'đã_hủy' ? '#fee2e2' :
    type === 'hoàn_tất' ? '#d1fae5' :
    type === 'chờ_duyệt' ? '#fef3c7' : 'transparent'};
  color: ${({ type }) =>
    type === 'đã_hủy' ? '#b91c1c' :
    type === 'hoàn_tất' ? '#047857' :
    type === 'chờ_duyệt' ? '#92400e' : '#333'};
`;
const Modal = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;
const ModalTextarea = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
const ModalActions = styled.div`
  margin-top: 10px;
  text-align: right;
  & > button {
    padding: 8px 16px;
    margin-left: 8px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(16,185,129,0.08);
    transition: background 0.2s, box-shadow 0.2s;
  }
  & > button:first-child {
    background-color: #10b981;
    color: white;
  }
  & > button:first-child:hover {
    background-color: #0e6c40;
  }
  & > button:last-child {
    background-color: #ef4444;
    color: white;
  }
  & > button:last-child:hover {
    background-color: #dc2626;
  }
`;
const ViewReviewLink = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background-color: #22c55e;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease;
  margin-top: 20px;
  &:hover { background-color: #16a34a; }
`;
const STATUS_LABELS = {
  "Hoàn_tất": "hoàn_tất",
  "Đã_hủy": "đã_hủy",
  "Chờ_duyệt": "chờ_duyệt"
};

const LichSuDichVu = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("Tất cả");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dichVuDangDanhGia, setDichVuDangDanhGia] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Hàm chuyển đổi trạng thái từ code sang text
  const convertStatus = (serviceStatus) => {
    switch (serviceStatus) {
      case 1: return 'Đã thanh toán';
      case 2: return 'Đã hủy';
      case 3: return 'Hoàn_tất';
      default: return 'Chờ xử lý';
    }
  };

  // Hàm lấy style cho trạng thái
  const getStatusStyle = (trangThai) => {
    switch (trangThai) {
      case 'Hoàn_tất':
      case 'Đã thanh toán':
        return { color: '#22c55e', fontWeight: 600 };
      case 'Đã hủy':
        return { color: '#ef4444', fontWeight: 600 };
      case 'Chờ xử lý':
      default:
        return { color: '#f59e42', fontWeight: 600 };
    }
  };

  useEffect(() => {
  const fetchLichSuDichVu = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Không tìm thấy token trong localStorage");
        return;
      }

      const res = await fetch("https://api-gender2.purintech.id.vn/api/Appointment/advice-appointments", {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Lỗi mạng: ${res.status}`);
      }

      const json = await res.json();
      if (json.code === 200) {
        const mappedData = json.obj.map(item => ({
          ten: item.consultationType,
          ngayThucHien: new Date(item.appointmentDate).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          ghiChu: item.note,
          trangThai: convertStatus(item.serviceStatus),
        }));
        setData(mappedData);
      } else {
        console.warn("API trả về lỗi:", json.message);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  fetchLichSuDichVu();

  // Hiển thị alert sau 1 giây
  const alertTimeout = setTimeout(() => {
    setAlertMsg("🔔 Bạn có 3 thông báo mới!");
    setShowAlert(true);
  }, 1000);

  return () => clearTimeout(alertTimeout); // Dọn dẹp timeout
}, []);


  useEffect(() => {
    if (showAlert) {
      const t = setTimeout(() => setShowAlert(false), 10000);
      return () => clearTimeout(t);
    }
  }, [showAlert]);

  const filteredData = filter === "Tất cả"
    ? data
    : data.filter(d => d.trangThai === filter);

  const handleDelete = (index) => {
  if (window.confirm("Bạn có chắc muốn xóa mục này?")) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    // không cần lưu lại localStorage nữa
  }
};

  const openModal = (ten) => {
    setDichVuDangDanhGia(ten);
    setReviewText("");
    setModalOpen(true);
  };

  const saveReview = () => {
    if (!reviewText.trim()) {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    
    allReviews.push({
      tenDichVu: dichVuDangDanhGia,
      noiDung: reviewText,
      thoiGian: new Date().toLocaleString()
    });
    localStorage.setItem("danhGiaDichVu", JSON.stringify(allReviews));
    alert("Cảm ơn bạn đã đánh giá!");
    setModalOpen(false);
  };

  return (
    <Container>
      <HeaderCustomer />
      {showAlert && (
        <AlertBox>
          <p>{alertMsg}</p>
          <span onClick={() => setShowAlert(false)}>&times;</span>
        </AlertBox>
      )}
      <HistoryContainer>
        <Title>Lịch Sử Dịch Vụ</Title>
        <FilterBar>
          <label htmlFor="statusFilter">Lọc theo trạng thái:</label>
          <select
            id="statusFilter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Hoàn_tất">Hoàn tất</option>
            <option value="Đã_hủy">Đã hủy</option>
            <option value="Chờ_duyệt">Chờ duyệt</option>
          </select>
        </FilterBar>
        <Table>
          <thead>
            <Tr>
              <Th>Dịch Vụ</Th>
              <Th>Ngày Thực Hiện</Th>
              <Th>Trạng Thái</Th>
              <Th>Ghi Chú</Th>
              <Th>Thao Tác</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <Tr>
                <Td colSpan={5}>Không có dữ liệu phù hợp.</Td>
              </Tr>
            ) : (
              filteredData.map((item, idx) => (
                <Tr key={idx}>
                  <Td>{item.ten}</Td>
                  <Td>{item.ngayThucHien}</Td>
                  <Td style={getStatusStyle(item.trangThai)}>{item.trangThai}</Td>
                  <Td>{item.ghiChu || ""}</Td>
                  <Td>
                    <DeleteBtn onClick={() => handleDelete(data.indexOf(item))}>Xóa</DeleteBtn>
                    {item.trangThai === "Hoàn_tất" && (
                      <ReviewBtn onClick={() => openModal(item.ten)}>
                        Đánh giá
                      </ReviewBtn>
                    )}
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
        {modalOpen && (
          <Modal>
            <ModalContent>
              <h3>Đánh Giá Dịch Vụ</h3>
              <p>Dịch vụ: {dichVuDangDanhGia}</p>
              <ModalTextarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Nhập đánh giá của bạn..."
                rows={4}
              />
              <ModalActions>
                <button onClick={saveReview}>Gửi</button>
                <button onClick={() => setModalOpen(false)}>Hủy</button>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
        <div style={{ textAlign: "center" }}>
          <ViewReviewLink href="/customer/danh-gia-da-gui">
            📄 Xem đánh giá đã gửi
          </ViewReviewLink>
        </div>
      </HistoryContainer>
      <div style={{ width: "100%", marginTop: "auto" }}>
        <Footer />
      </div>
    </Container>
  );
};

export default LichSuDichVu;
