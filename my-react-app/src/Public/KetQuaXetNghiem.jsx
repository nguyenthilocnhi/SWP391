import React, { useEffect, useState } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 20px;
`;

const KetQuaXetNghiem = () => {
  const [ketQuaList, setKetQuaList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ketQuaXetNghiem")) || [];
    setKetQuaList(data);
  }, []);

  return (
    <div>
      <HeaderCustomer />
      <Container>
        <h2 className="page-title">📋 KẾT QUẢ XÉT NGHIỆM</h2>
        <table className="result-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Loại xét nghiệm</th>
              <th>Kết quả</th>
              <th>Ngày xét nghiệm</th>
              <th>Ngày trả kết quả</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {ketQuaList.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ color: "gray", textAlign: "center" }}>
                  ⚠️ Hiện chưa có kết quả xét nghiệm nào được lưu.
                </td>
              </tr>
            ) : (
              ketQuaList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.hoTen}</td>
                  <td>{item.loai}</td>
                  <td>{item.ketQua}</td>
                  <td>{item.ngayXetNghiem}</td>
                  <td>{item.ngayTra}</td>
                  <td>{item.ghiChu || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Container>
      <Footer />
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .result-container {
          max-width: 1200px;
          margin: 140px auto 0 auto; /* tăng từ 110px lên 140px */
          padding: 20px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .page-title {
          text-align: center;
          color: #0f172a;
          margin-top: 60px; /* tăng từ 30px lên 60px */
          margin-bottom: 30px;
        }
        .result-table {
          width: 100%;
          border-collapse: collapse;
        }
        .result-table thead {
          background-color: #f1f5f9;
        }
        .result-table th,
        .result-table td {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }
        .result-table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .result-table td {
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};

export default KetQuaXetNghiem;
