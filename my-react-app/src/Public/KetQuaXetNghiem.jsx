import React, { useEffect, useState } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";

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
    const fetchKetQua = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api-gender2.purintech.id.vn/api/Appointment/test-appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: '*/*'
            },
          }
        );
        
        if (response.data?.obj) {
          // Hiển thị tất cả đặt lịch có serviceStatus >= 4 (đã hoàn thành)
          const completedAppointments = response.data.obj.filter(item => 
            item.serviceStatus >= 4
          );
          console.log('Completed appointments:', completedAppointments);
          
          // Lấy thêm thông tin chi tiết từ API approve cho từng đặt lịch
          const appointmentsWithDetails = await Promise.all(
            completedAppointments.map(async (appointment) => {
              try {
                const detailResponse = await axios.get(
                  `https://api-gender2.purintech.id.vn/api/Appointment/test-result/${appointment.id}/approve`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      accept: '*/*'
                    },
                  }
                );
                
                return {
                  ...appointment,
                  result: detailResponse.data?.result || appointment.testResult,
                  conclusion: detailResponse.data?.conclusion || appointment.conclusion,
                  suggestion: detailResponse.data?.suggestion || appointment.note
                };
              } catch (error) {
                console.error(`Lỗi khi lấy chi tiết cho appointment ${appointment.id}:`, error);
                return appointment;
              }
            })
          );
          
          setKetQuaList(appointmentsWithDetails);
        } else {
          setKetQuaList([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải kết quả:", error);
        setKetQuaList([]);
      }
    };

    fetchKetQua();
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
               <th>Loại xét nghiệm</th>
               <th>Kết quả</th>
               <th>Ngày xét nghiệm</th>
               <th>Ngày trả kết quả</th>
               <th>Lời khuyên</th>
             </tr>
           </thead>
          <tbody>
                         {ketQuaList.length === 0 ? (
               <tr>
                 <td colSpan={7} style={{ color: "gray", textAlign: "center" }}>
                   ⚠️ Hiện chưa có kết quả xét nghiệm nào.
                 </td>
               </tr>
             ) : (
              ketQuaList.map((item, index) => (
                                 <tr key={index}>
                   <td>{index + 1}</td>
                   <td>{item.testName}</td>
                   <td>{item.result || item.testResult || item.resultStatus || "Đã hoàn thành"}</td>
                   <td>{item.appointmentDate?.split("T")[0]}</td>
                   <td>{item.createdDate?.split("T")[0] || "-"}</td>
                   <td>{item.suggestion || item.note || "-"}</td>
                 </tr>
              ))
            )}
          </tbody>
        </table>
      </Container>
      <Footer />
      <style>{`
        .page-title {
          text-align: center;
          color: #0f172a;
          margin-top: 60px;
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
