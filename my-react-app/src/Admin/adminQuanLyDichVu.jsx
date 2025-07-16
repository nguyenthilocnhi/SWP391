import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

// Styled-components giống adminKhachHang
const MainContent = styled.main`
  padding: 120px 0 24px 215px;
  background: #f9fafb;
  min-height: 100vh;
  width: 144vw;
  max-width: 99vw;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
  @media (max-width: 768px) {
    padding-top: 80px;
    padding-left: 0;
  }
`;
const ContentWrapper = styled.div`
  max-width: 1230px;
  margin: 0 54px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 4px;
  }
`;
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 32px 28px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;
const SearchBox = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 220px;
`;
const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  color: #374151;
  margin-left: 12px;
`;
const TableContainer = styled.div`
  overflow-x: auto;
`;
const ServiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const ServiceTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;
const ServiceTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
`;
const Button = styled.button`
  padding: 8px 18px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  background-color: #4ade80;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  margin-right: 8px;
  transition: background 0.2s, color 0.2s;
  outline: none;
  &:hover {
    background-color: #059669;
    color: #fff;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;
const ModalContent = styled.div`
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;
  max-height: 520px;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(79,70,229,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
`;
const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 18px;
  margin-bottom: 16px;
  color: #111827;
  text-align: center;
`;
const ModalInput = styled.input`
  width: 93%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #fff;
  }
`;
const ModalSelect = styled.select`
  width: 97%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #fff;
  }
`;
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ModalLabel = styled.label`
  font-size: 14px;
  color: #374151;
  margin-bottom: 2px;
  font-weight: 500;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 15px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
`;

// FE_SAMPLE_DATA từ Public/DichVu.jsx
const FE_SAMPLE_DATA = [
  {"ma":"XT001","loai":"Xét nghiệm","ten":"HIV Ag/Ab combo (HIV test thế hệ 4)","mucdich":"Phát hiện sớm HIV (sau 2 - 4 tuần)","thoigian":"1 - 3 giờ","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"XT002","loai":"Xét nghiệm","ten":"Xét nghiệm giang mai (RPR/TPHA)","mucdich":"Phát hiện bệnh giang mai","thoigian":"2 - 24 giờ","chiphi":"200.000","tinhtrang":"Có","an":false},
  {"ma":"XT003","loai":"Xét nghiệm","ten":"Xét nghiệm lậu (PCR hoặc nhuộm soi)","mucdich":"Phát hiện vi khuẩn lậu","thoigian":"3 - 24 giờ","chiphi":"800.000","tinhtrang":"Có","an":false},
  {"ma":"XT004","loai":"Xét nghiệm","ten":"Chlamydia (PCR)","mucdich":"Phát hiện nhiễm Chlamydia","thoigian":"1 - 2 ngày","chiphi":"650.000","tinhtrang":"Có","an":false},
  {"ma":"XT005","loai":"Xét nghiệm","ten":"HBsAg, Anti-HBs","mucdich":"Kiểm tra viêm gan B","thoigian":"2 - 8 giờ","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"XT006","loai":"Xét nghiệm","ten":"HCV Ab","mucdich":"Kiểm tra viêm gan C","thoigian":"4 - 24 giờ","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"XT007","loai":"Xét nghiệm","ten":"Xét nghiệm HSV 1 & 2 (Herpes Simplex Virus)","mucdich":"Phát hiện mụn rộp sinh dục","thoigian":"1 - 2 ngày","chiphi":"700.000","tinhtrang":"Có","an":false},
  {"ma":"XT008","loai":"Xét nghiệm","ten":"Pap smear (Tế bào học cổ tử cung)","mucdich":"Sàng lọc ung thư cổ tử cung","thoigian":"1 - 3 ngày","chiphi":"500.000","tinhtrang":"Có","an":false},
  {"ma":"XT009","loai":"Xét nghiệm","ten":"Trichomonas vaginalis","mucdich":"Phát hiện trùng roi âm đạo","thoigian":"Vài giờ","chiphi":"70.000","tinhtrang":"Có","an":false},
  {"ma":"XT010","loai":"Xét nghiệm","ten":"Sùi mào gà","mucdich":"Phát hiện virus gây u nhú sinh dục (mào gà)","thoigian":"2 - 5 ngày","chiphi":"1.200.000","tinhtrang":"Có","an":false},
  {"ma":"XT011","loai":"Xét nghiệm","ten":"Chancroid (Hạ cam mềm)","mucdich":"Phát hiện vi khuẩn Haemophilus ducreyi gây loét sinh dục","thoigian":"2 - 4 ngày","chiphi":"800.000","tinhtrang":"Có","an":false},
  {"ma":"XT012","loai":"Xét nghiệm","ten":"Rận mu (Pubic lice)","mucdich":"Phát hiện ký sinh trùng vùng mu qua soi hiển vi","thoigian":"1 - 2 giờ","chiphi":"100.000","tinhtrang":"Có","an":false},
  {"ma":"XT013","loai":"Xét nghiệm","ten":"Virus Zika (PCR)","mucdich":"Phát hiện virus Zika có thể lây qua đường tình dục","thoigian":"3 - 7 ngày","chiphi":"1.200.000","tinhtrang":"Có","an":false},
  {"ma":"XT014","loai":"Xét nghiệm","ten":"Mycoplasma genitalium","mucdich":"Phát hiện vi khuẩn gây viêm niệu đạo, viêm vùng chậu","thoigian":"1 - 3 ngày","chiphi":"800.000","tinhtrang":"Có","an":false},
  {"ma":"XT015","loai":"Xét nghiệm","ten":"Ureaplasma urealyticum","mucdich":"Phát hiện vi khuẩn có thể gây vô sinh, viêm phụ khoa","thoigian":"1 - 3 ngày","chiphi":"700.000","tinhtrang":"Có","an":false},
  {"ma":"TV001","loai":"Tư vấn","ten":"Tư vấn trước khi làm xét nghiệm STI","mucdich":"Hướng dẫn lựa chọn xét nghiệm phù hợp, đánh giá nguy cơ lây nhiễm","thoigian":"20 - 30 phút","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"TV002","loai":"Tư vấn","ten":"Tư vấn sau khi nhận kết quả xét nghiệm","mucdich":"Giải thích kết quả và hướng dẫn bước tiếp theo","thoigian":"15 - 30 phút","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"TV003","loai":"Tư vấn","ten":"Tư vấn xét nghiệm định kỳ","mucdich":"Gợi ý tần suất xét nghiệm phù hợp dựa trên hành vi tình dục","thoigian":"15 - 30 phút","chiphi":"150.000","tinhtrang":"Có","an":false},
  {"ma":"TV004","loai":"Tư vấn","ten":"Tư vấn lựa chọn gói xét nghiệm phù hợp","mucdich":"Giải thích các loại xét nghiệm, combo test và lợi ích của từng loại","thoigian":"15 - 20 phút","chiphi":"100.000","tinhtrang":"Có","an":false},
  {"ma":"TV005","loai":"Tư vấn","ten":"Tư vấn cho cặp đôi trước QHTD không bao","mucdich":"Hướng dẫn xét nghiệm STI an toàn trước khi quan hệ không dùng bao cao su","thoigian":"30 phút","chiphi":"200.000","tinhtrang":"Có","an":false},
  {"ma":"TV006","loai":"Tư vấn","ten":"Tư vấn sức khỏe sinh sản","mucdich":"Hỗ trợ cá nhân hoặc cặp đôi hiểu rõ hơn về sức khỏe sinh sản, phòng tránh thai, kế hoạch hóa gia đình.","thoigian":"30 phút - 45 phút","chiphi":"200.000","tinhtrang":"Có","an":false},
  {"ma":"TV007","loai":"Tư vấn","ten":"Tư vấn tình dục an toàn","mucdich":"Cung cấp kiến thức về quan hệ tình dục an toàn, tránh mang thai ngoài ý muốn, bảo vệ bản thân khỏi lây nhiễm.","thoigian":"30 phút - 45 phút","chiphi":"200.000","tinhtrang":"Có","an":false},
  {"ma":"TV008","loai":"Tư vấn","ten":"Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên","mucdich":"Giúp thanh thiếu niên hiểu về sự phát triển cơ thể, giới tính, cách bảo vệ bản thân và mối quan hệ lành mạnh.","thoigian":"30 phút - 45 phút","chiphi":"200.000","tinhtrang":"Có","an":false}
];

const initialForm = { ma: '', loai: '', ten: '', mucdich: '', thoigian: '', chiphi: '', tinhtrang: 'Có', overview: '', suitableFor: '', preparation: '', process: '', detail: '', moreInfo: '', an: false };

const AdminQuanLyDichVu = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterLoai, setFilterLoai] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const [modalStep, setModalStep] = useState(1);
  const [confirmAnIndex, setConfirmAnIndex] = useState(null);
  const [confirmAnMode, setConfirmAnMode] = useState(''); // 'an' hoặc 'hien'

  // Lấy danh sách dịch vụ từ API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const [testData, adviseData] = await Promise.all([
        fetch('https://api-gender2.purintech.id.vn/api/Service/test-services', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Cache-Control': 'no-cache'
          }
        }).then(res => res.json()),
        fetch('https://api-gender2.purintech.id.vn/api/Service/advise-services', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Cache-Control': 'no-cache'
          }
        }).then(res => res.json())
      ]);
      const testServices = (testData?.obj || []).map(item => ({
        ...item,
        ma: item.id,
        ten: item.testName,
        loai: 'Xét nghiệm',
        mucdich: item.description,
        thoigian: item.duration,
        chiphi: item.price,
        tinhtrang: item.isAvailable ? 'Có' : 'Không có',
        an: !item.isAvailable,
        overview: item.overview || '',
        suitableFor: Array.isArray(item.suitableFor) ? item.suitableFor : (item.suitableFor || ''),
        preparation: Array.isArray(item.preparation) ? item.preparation : (item.preparation || ''),
        process: Array.isArray(item.process) ? item.process : (item.process || ''),
        detail: item.detail || '',
        moreInfo: item.moreInfo || '',
        _raw: item
      }));
      const adviseServices = (adviseData?.obj || []).map(item => ({
        ...item,
        ma: item.id,
        ten: item.consultationType || item.name || '',
        loai: 'Tư vấn',
        mucdich: item.description,
        thoigian: item.duration || item.time || '',
        chiphi: item.price,
        tinhtrang: item.isAvailable ? 'Có' : 'Không có',
        an: !item.isAvailable,
        overview: item.overview || '',
        suitableFor: Array.isArray(item.suitableFor) ? item.suitableFor : (item.suitableFor || ''),
        preparation: Array.isArray(item.preparation) ? item.preparation : (item.preparation || ''),
        process: Array.isArray(item.process) ? item.process : (item.process || ''),
        detail: item.detail || '',
        moreInfo: item.moreInfo || '',
        _raw: item
      }));
      // Ép render lại
      setServices([]);
      setTimeout(() => {
        setServices([...testServices, ...adviseServices]);
        console.log('Dịch vụ mới:', [...testServices, ...adviseServices]);
      }, 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Lọc dịch vụ
  const filteredServices = services.filter(s => {
    const matchSearch =
      s.ten.toLowerCase().includes(search.toLowerCase()) ||
      s.ma.toLowerCase().includes(search.toLowerCase()) ||
      s.mucdich.toLowerCase().includes(search.toLowerCase());
    const matchLoai = filterLoai ? s.loai === filterLoai : true;
    return matchSearch && matchLoai;
  });

  // Modal
  const openAddModal = () => {
    setModalType('add');
    setForm(initialForm);
    setEditIndex(null);
    setModalStep(1);
    setModalOpen(true);
  };
  const openEditModal = idx => {
    setModalType('edit');
    const s = services[idx];
    setForm({
      ...s,
      suitableFor: Array.isArray(s.suitableFor) ? s.suitableFor.join('\n') : (s.suitableFor || ''),
      preparation: Array.isArray(s.preparation) ? s.preparation.join('\n') : (s.preparation || ''),
      process: Array.isArray(s.process) ? s.process.join('\n') : (s.process || ''),
    });
    setEditIndex(idx);
    setModalStep(1);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setFormError('');
    setModalStep(1);
  };

  // Xử lý form
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'loai') {
      let prefix = value === 'Tư vấn' ? 'TV' : value === 'Xét nghiệm' ? 'XT' : '';
      if (prefix) {
        const maList = services
          .filter(s => s.loai === value && s.ma.startsWith(prefix))
          .map(s => s.ma.replace(prefix, ''))
          .map(num => parseInt(num, 10))
          .filter(num => !isNaN(num));
        let nextNum = 1;
        if (maList.length > 0) {
          nextNum = Math.max(...maList) + 1;
        }
        const nextMa = prefix + String(nextNum).padStart(3, '0');
        setForm(f => ({ ...f, loai: value, ma: nextMa }));
      } else {
        setForm(f => ({ ...f, loai: value, ma: '' }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  // Bước 1: Tiếp tục sang bước 2
  const handleNextStep = async e => {
    e.preventDefault();
    if (!form.ma || !form.loai || !form.ten || !form.mucdich || !form.thoigian || !form.chiphi || !form.tinhtrang) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    // Kiểm tra trùng mã dịch vụ khi thêm mới
    if (modalType === 'add' && services.some(s => s.ma.trim().toLowerCase() === form.ma.trim().toLowerCase())) {
      setFormError('Mã dịch vụ đã tồn tại.');
      return;
    }
    setFormError('');
    // Bỏ qua bước 2, lưu trực tiếp
    await handleSave(e);
  };
  // Bước 2: Lưu dịch vụ (THÊM/SỬA)
  const handleSave = async e => {
    e.preventDefault();
    setFormError('');
    try {
      let data = null;
      if (modalType === 'add') {
        const endpoint = form.loai === 'Tư vấn' 
          ? 'https://api-gender2.purintech.id.vn/api/Service/advise-service'
          : 'https://api-gender2.purintech.id.vn/api/Service/test-service';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(form)
        });
        data = await response.json();
        console.log('Kết quả thêm dịch vụ:', data);
        if (!response.ok) {
          throw new Error('Lỗi khi thêm dịch vụ');
        }
      } else if (modalType === 'edit' && editIndex !== null) {
        const id = services[editIndex]._raw.id || services[editIndex].ma;
        const endpoint = form.loai === 'Tư vấn'
          ? `https://api-gender2.purintech.id.vn/api/Service/advise-service/${id}`
          : `https://api-gender2.purintech.id.vn/api/Service/test-service/${id}`;
        const payload = { ...form };
        // Map lại trường dữ liệu cho đúng backend
        payload.price = Number(form.chiphi);
        payload.description = form.mucdich;
        payload.duration = form.thoigian;
        payload.isAvailable = form.tinhtrang === 'Có';
        if (form.loai === 'Tư vấn') {
          payload.consultationType = form.ten;
        } else {
          payload.testName = form.ten;
        }
        delete payload.chiphi;
        delete payload.ten;
        delete payload.mucdich;
        delete payload.thoigian;
        delete payload.tinhtrang;
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        });
        data = await response.json();
        console.log('Kết quả cập nhật dịch vụ:', data);
        if (!response.ok) {
          throw new Error('Lỗi khi cập nhật dịch vụ');
        }
      }
      closeModal();
      await fetchServices();
    } catch (error) {
      console.error('Lỗi khi lưu dịch vụ:', error);
      setFormError('Lỗi khi lưu dịch vụ!');
    }
  };
  
  // Xóa dịch vụ
  const handleDelete = async idx => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) return;
    try {
      const s = services[idx];
      const id = s._raw?.id || s.ma;
      const endpoint = s.loai === 'Tư vấn'
        ? `https://api-gender2.purintech.id.vn/api/Service/advise-service/${id}`
        : `https://api-gender2.purintech.id.vn/api/Service/test-service/${id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      console.log('Kết quả xóa dịch vụ:', data);
      if (!response.ok) {
        throw new Error('Lỗi khi xóa dịch vụ');
      }
      fetchServices();
      alert('Xóa dịch vụ thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa dịch vụ:', error);
      alert('Lỗi khi xóa dịch vụ!');
    }
  };
  
  // Ẩn/hiện dịch vụ (nếu backend hỗ trợ, nên dùng PUT cập nhật trường an)
  const handleToggleAn = idx => {
    const isAn = !services[idx].an;
    setConfirmAnIndex(idx);
    setConfirmAnMode(isAn ? 'an' : 'hien');
  };
  
  const handleConfirmAn = () => {
    if (confirmAnIndex !== null) {
      // Ẩn/hiện dịch vụ thông qua API
      const s = services[confirmAnIndex];
      const id = s._raw.id || s.ma;
      // Gửi đúng trường isAvailable cho backend
      const updateData = { isAvailable: !s.an };
      const endpoint = s.loai === 'Tư vấn'
        ? `https://api-gender2.purintech.id.vn/api/Service/advise-service/${id}`
        : `https://api-gender2.purintech.id.vn/api/Service/test-service/${id}`;

      fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      })
        .then(response => response.json().then(data => {
          console.log('Kết quả cập nhật trạng thái:', data);
          if (!response.ok) throw new Error('Lỗi khi cập nhật trạng thái');
          fetchServices();
          alert(`${!s.an ? 'Đã ẩn' : 'Đã hiện'} dịch vụ thành công!`);
        }))
        .catch(error => {
          console.error('Lỗi khi ẩn/hiện dịch vụ:', error);
          alert('Lỗi khi ẩn/hiện dịch vụ!');
        });
    }
    setConfirmAnIndex(null);
    setConfirmAnMode('');
  };
  const handleCancelAn = () => {
    setConfirmAnIndex(null);
    setConfirmAnMode('');
  };
  const handleBackStep = () => {
    setModalStep(1);
    setFormError('');
  };

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <Card>
            <CardHeader>
              <CardTitle>Quản lý dịch vụ</CardTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <SearchBox
                  type="text"
                  placeholder="Tìm theo tên, mã, mục đích..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <FilterSelect value={filterLoai} onChange={e => setFilterLoai(e.target.value)}>
                  <option value="">Tất cả loại</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                </FilterSelect>
                <Button onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaPlus /> Thêm dịch vụ
                </Button>
              </div>
            </CardHeader>
            <TableContainer>
              <ServiceTable>
                <thead>
                  <tr>
                    <ServiceTh>ID</ServiceTh>
                    <ServiceTh>Loại</ServiceTh>
                    <ServiceTh>Tên dịch vụ</ServiceTh>
                    <ServiceTh>Mô tả</ServiceTh>
                    <ServiceTh>Thời gian</ServiceTh>
                    <ServiceTh>Chi phí</ServiceTh>
                    <ServiceTh>Trạng thái</ServiceTh>
                    <ServiceTh>Thao tác</ServiceTh>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><ServiceTd colSpan={8} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</ServiceTd></tr>
                  ) : filteredServices.length === 0 ? (
                    <tr><ServiceTd colSpan={8} style={{ textAlign: 'center' }}>Không có dịch vụ phù hợp.</ServiceTd></tr>
                  ) : (
                    filteredServices.map((item) => (
                      <tr key={item.id + '-' + item.loai}>
                        <ServiceTd>{item.id}</ServiceTd>
                        <ServiceTd>{item.loai}</ServiceTd>
                        <ServiceTd>{item.testName || item.consultationType || item.ten || ''}</ServiceTd>
                        <ServiceTd>{item.description || ''}</ServiceTd>
                        <ServiceTd>{item.duration || item.thoigian || ''}</ServiceTd>
                        <ServiceTd>{item.price ? item.price + '.000 VNĐ' : ''}</ServiceTd>
                        <ServiceTd>{item.isAvailable ? 'Có' : 'Không có'}</ServiceTd>
                        <ServiceTd>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <Button style={{ background: '#fbbf24', color: '#fff', marginRight: 6 }} onClick={() => openEditModal(services.indexOf(item))} title="Sửa"><FaEdit /></Button>
                            <Button style={{ background: 'transparent', color: item.an ? '#9ca3af' : '#22c55e', boxShadow: 'none', border: 'none', padding: '8px 12px' }} onClick={() => handleToggleAn(services.indexOf(item))} title={item.an ? 'Hiện' : 'Ẩn'}>
                              {item.an ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </Button>
                            <Button style={{ background: '#ef4444', color: '#fff', marginRight: 6 }} onClick={() => handleDelete(services.indexOf(item))} title="Xóa"><FaTrash /></Button>
                          </div>
                        </ServiceTd>
                      </tr>
                    ))
                  )}
                </tbody>
              </ServiceTable>
            </TableContainer>
          </Card>
        </ContentWrapper>
      </MainContent>
      {/* Popup xác nhận ẩn/hiện dịch vụ */}
      {confirmAnIndex !== null && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Xác nhận {confirmAnMode === 'an' ? 'ẩn' : 'hiện'} dịch vụ</ModalTitle>
            <div style={{ marginBottom: 18, textAlign: 'center', color: '#374151' }}>
              Bạn có chắc chắn muốn {confirmAnMode === 'an' ? 'ẩn' : 'hiện'} dịch vụ <b>{services[confirmAnIndex].ten}</b> không?
            </div>
            <ModalActions>
              <Button type="button" style={{ background: '#e5e7eb', color: '#374151' }} onClick={handleCancelAn}>Hủy</Button>
              <Button type="button" onClick={handleConfirmAn}>Xác nhận</Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>{modalType === 'add' ? 'Thêm dịch vụ' : 'Chỉnh sửa dịch vụ'}</ModalTitle>
            {formError && <ErrorMsg>{formError}</ErrorMsg>}
            <ModalForm onSubmit={handleNextStep}>
              <ModalLabel>Loại</ModalLabel>
              <ModalSelect name="loai" value={form.loai} onChange={handleChange}>
                <option value="">-- Chọn loại --</option>
                <option value="Tư vấn">Tư vấn</option>
                <option value="Xét nghiệm">Xét nghiệm</option>
              </ModalSelect>
              <ModalLabel>Mã dịch vụ</ModalLabel>
              <ModalInput name="ma" value={form.ma} onChange={handleChange} placeholder="Mã dịch vụ" readOnly />
              <ModalLabel>Tên dịch vụ</ModalLabel>
              <ModalInput name="ten" value={form.ten} onChange={handleChange} placeholder="Nhập tên dịch vụ" />
              <ModalLabel>Mô tả</ModalLabel>
              <ModalInput name="mucdich" value={form.mucdich} onChange={handleChange} placeholder="Nhập mô tả" />
              <ModalLabel>Thời gian</ModalLabel>
              <ModalInput name="thoigian" value={form.thoigian} onChange={handleChange} placeholder="Nhập thời gian" />
              <ModalLabel>Chi phí</ModalLabel>
              <ModalInput name="chiphi" value={form.chiphi} onChange={handleChange} placeholder="Nhập chi phí" />
              <ModalLabel>Trạng thái</ModalLabel>
              <ModalSelect name="tinhtrang" value={form.tinhtrang} onChange={handleChange}>
                <option value="Có">Có</option>
                <option value="Không có">Không có</option>
              </ModalSelect>
              <ModalActions>
                <Button type="button" style={{ background: '#e5e7eb', color: '#374151' }} onClick={closeModal}>Hủy</Button>
                <Button type="submit">Lưu</Button>
              </ModalActions>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminQuanLyDichVu;
