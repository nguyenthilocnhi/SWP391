import React, { useState } from 'react';
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
  margin-bottom: 4px;
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
  const [services, setServices] = useState(FE_SAMPLE_DATA);
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
    // Nếu chọn loại dịch vụ, tự động gợi ý mã tiếp theo
    if (name === 'loai') {
      let prefix = value === 'Tư vấn' ? 'TV' : value === 'Xét nghiệm' ? 'XT' : '';
      if (prefix) {
        // Lấy danh sách mã hiện có cùng loại
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
  const handleNextStep = e => {
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
    setModalStep(2);
  };
  // Bước 2: Lưu dịch vụ
  const handleSave = e => {
    e.preventDefault();
    // Validate chi tiết bắt buộc
    if (!form.mota || !form.huongdan || !form.quytrinh || !form.luuy) {
      setFormError('Vui lòng nhập đầy đủ thông tin chi tiết.');
      return;
    }
    setFormError('');
    if (modalType === 'add') {
      updateServices([...services, form]);
    } else if (modalType === 'edit' && editIndex !== null) {
      const updated = [...services];
      updated[editIndex] = form;
      updateServices(updated);
    }
    closeModal();
  };
  // Ẩn/hiện dịch vụ (có xác nhận)
  const handleToggleAn = idx => {
    const isAn = !services[idx].an;
    setConfirmAnIndex(idx);
    setConfirmAnMode(isAn ? 'an' : 'hien');
  };
  const handleConfirmAn = () => {
    if (confirmAnIndex !== null) {
      updateServices(services.map((s, i) => i === confirmAnIndex ? { ...s, an: !s.an, tinhtrang: !s.an ? 'Đã ẩn' : 'Có' } : s));
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

  // Sau khi cập nhật danh sách dịch vụ, lưu vào localStorage
  const updateServices = (newServices) => {
    setServices(newServices);
    localStorage.setItem('danhSachDichVu', JSON.stringify(newServices));
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
                    <ServiceTh>STT</ServiceTh>
                    <ServiceTh>Mã</ServiceTh>
                    <ServiceTh>Loại</ServiceTh>
                    <ServiceTh>Tên dịch vụ</ServiceTh>
                    <ServiceTh>Mục đích</ServiceTh>
                    <ServiceTh>Thời gian</ServiceTh>
                    <ServiceTh>Chi phí</ServiceTh>
                    <ServiceTh>Tình trạng</ServiceTh>
                    <ServiceTh>Thao tác</ServiceTh>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr><ServiceTd colSpan={9} style={{ textAlign: 'center' }}>Không có dịch vụ phù hợp.</ServiceTd></tr>
                  ) : (
                    filteredServices.map((item, idx) => (
                      <tr key={item.ma}>
                        <ServiceTd>{idx + 1}</ServiceTd>
                        <ServiceTd>{item.ma}</ServiceTd>
                        <ServiceTd>{item.loai}</ServiceTd>
                        <ServiceTd>{item.ten}</ServiceTd>
                        <ServiceTd>{item.mucdich}</ServiceTd>
                        <ServiceTd>{item.thoigian}</ServiceTd>
                        <ServiceTd>{item.chiphi}</ServiceTd>
                        <ServiceTd>{item.an ? 'Đã ẩn' : item.tinhtrang}</ServiceTd>
                        <ServiceTd>
                          <Button style={{ background: '#fbbf24', color: '#fff', marginRight: 6 }} onClick={() => openEditModal(services.indexOf(item))} title="Sửa"><FaEdit /></Button>
                          <Button style={{ background: 'transparent', color: item.an ? '#9ca3af' : '#22c55e', boxShadow: 'none', border: 'none', padding: '8px 12px' }} onClick={() => handleToggleAn(services.indexOf(item))} title={item.an ? 'Hiện' : 'Ẩn'}>
                            {item.an ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </Button>
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
            <ModalTitle>{modalType === 'add' ? (modalStep === 1 ? 'Thêm dịch vụ' : 'Chi tiết dịch vụ') : (modalStep === 1 ? 'Sửa dịch vụ' : 'Chi tiết dịch vụ')}</ModalTitle>
            {formError && <ErrorMsg>{formError}</ErrorMsg>}
            {modalStep === 1 ? (
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
                <ModalLabel>Mục đích</ModalLabel>
                <ModalInput name="mucdich" value={form.mucdich} onChange={handleChange} placeholder="Nhập mục đích" />
                <ModalLabel>Thời gian</ModalLabel>
                <ModalInput name="thoigian" value={form.thoigian} onChange={handleChange} placeholder="Nhập thời gian thực hiện" />
                <ModalLabel>Chi phí</ModalLabel>
                <ModalInput name="chiphi" value={form.chiphi} onChange={handleChange} placeholder="Nhập chi phí" />
                <ModalLabel>Tình trạng</ModalLabel>
                {modalType === 'add' ? (
                  <ModalInput name="tinhtrang" value="Có" readOnly />
                ) : (
                  <ModalInput name="tinhtrang" value={form.tinhtrang} onChange={handleChange} placeholder="Có/Không" />
                )}
                <ModalActions>
                  <Button type="button" style={{ background: '#e5e7eb', color: '#374151' }} onClick={closeModal}>Hủy</Button>
                  <Button type="submit">Tiếp tục</Button>
                </ModalActions>
              </ModalForm>
            ) : (
              <ModalForm onSubmit={handleSave}>
                <ModalLabel>Tổng quan xét nghiệm</ModalLabel>
                <ModalInput as="textarea" rows={2} name="overview" value={form.overview || ''} onChange={handleChange} placeholder="Nhập tổng quan xét nghiệm" />
                <ModalLabel>Xét nghiệm phù hợp dành cho đối tượng nào (mỗi dòng 1 đối tượng)</ModalLabel>
                <ModalInput as="textarea" rows={2} name="suitableFor" value={form.suitableFor || ''} onChange={handleChange} placeholder="Nhập đối tượng phù hợp, mỗi dòng 1 đối tượng" />
                <ModalLabel>Lưu ý trước khi thực hiện xét nghiệm (mỗi dòng 1 lưu ý)</ModalLabel>
                <ModalInput as="textarea" rows={2} name="preparation" value={form.preparation || ''} onChange={handleChange} placeholder="Nhập lưu ý, mỗi dòng 1 lưu ý" />
                <ModalLabel>Quy trình xét nghiệm (mỗi dòng 1 bước)</ModalLabel>
                <ModalInput as="textarea" rows={2} name="process" value={form.process || ''} onChange={handleChange} placeholder="Nhập quy trình, mỗi dòng 1 bước" />
                <ModalLabel>Chi tiết dịch vụ</ModalLabel>
                <ModalInput as="textarea" rows={2} name="detail" value={form.detail || ''} onChange={handleChange} placeholder="Nhập chi tiết dịch vụ (tùy chọn)" />
                <ModalLabel>Thông tin bổ sung</ModalLabel>
                <ModalInput as="textarea" rows={2} name="moreInfo" value={form.moreInfo || ''} onChange={handleChange} placeholder="Nhập thông tin bổ sung (tùy chọn)" />
                <ModalActions>
                  <Button type="button" style={{ background: '#e5e7eb', color: '#374151' }} onClick={handleBackStep}>Quay lại</Button>
                  <Button type="submit">Lưu</Button>
                </ModalActions>
              </ModalForm>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminQuanLyDichVu;
