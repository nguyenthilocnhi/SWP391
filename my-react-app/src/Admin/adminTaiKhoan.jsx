import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const MainContent = styled.main`
  padding: 120px 0 24px 250px;
  background: #f9fafb;
  min-height: 100vh;
  width: 100vw;
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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 16px;
  }
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 32px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #f3f4f6;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;
const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;
const SearchBox = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  width: 240px;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
`;
const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
`;
const StaffTh = styled.th`
  text-align: left;
  padding: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  border-bottom: 2px solid #e5e7eb;
  background: #f9fafb;
`;
const StaffTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
  &:hover {
    background: #f9fafb;
  }
`;
const Badge = styled.span`
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => props.$status === 'confirmed' ? '#d1fae5' : props.$status === 'pending' ? '#fef3c7' : '#dbeafe'};
  color: ${props => props.$status === 'confirmed' ? '#065f46' : props.$status === 'pending' ? '#92400e' : '#1e40af'};
  border: 1px solid ${props => props.$status === 'confirmed' ? '#a7f3d0' : props.$status === 'pending' ? '#fde68a' : '#bfdbfe'};
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${props => {
    if (props.$active) return '#4ade80';
    if (props.$color) return props.$color;
    return '#f3f4f6';
  }};
  color: ${props => {
    if (props.$active) return '#fff';
    if (props.$textcolor) return props.$textcolor;
    return '#059669';
  }};
  cursor: pointer;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  &:focus {
    border: none;
    outline: none;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
  backdrop-filter: blur(4px);
`;
const ModalContent = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  border: 1px solid #e5e7eb;
`;
const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
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
const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  color: #374151;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    outline: none;
    border-color:rgb(11, 12, 12);
    box-shadow: 0 0 0 2pxrgba(69, 69, 72, 0.2);
    background: #fff;
  }
  /* Style dropdown list */
  &::-webkit-scrollbar {
    width: 8px;
    background: #f3f4f6;
  }
  & option {
    background: #fff;
    color: #374151;
    border-radius: 8px;
    padding: 8px 12px;
  }
`;

// Hàm định dạng ngày tháng
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

// Hàm lấy ngẫu nhiên từ mảng
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const AdminTaiKhoan = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    date: '', 
    address: '',
    password: '',
    confirmPassword: '',
    role: 4
  });
  const [formError, setFormError] = useState('');
  const errorTimeoutRef = React.useRef();
  
  // Cấu hình phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [detailIndex, setDetailIndex] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [roleUpdateLoading, setRoleUpdateLoading] = useState(false);
  const [roleUpdateError, setRoleUpdateError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  // State cho dropdown chi tiết dịch vụ
  const [serviceDetailOptions, setServiceDetailOptions] = useState([]);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpEmail, setOtpEmail] = useState('');

  // API lấy danh sách tất cả người dùng
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('https://api-gender2.purintech.id.vn/api/User/all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        // Chuyển đổi dữ liệu từ API sang định dạng hiển thị
        const formattedUsers = data.obj.map(user => ({
          id: user.id,
          name: user.fullName,
          email: user.email,
          phone: user.phoneNumber,
          date: user.dateOfBirth,
          address: user.address,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          status: user.isEmailVerified ? 'confirmed' : 'pending',
          type: getRoleName(user.role)
        }));
        setCustomers(formattedUsers);
      } else {
        setError(data.message || 'Có lỗi xảy ra khi tải dữ liệu');
      }
    } catch (error) {
      setError('Lỗi kết nối mạng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm chuyển đổi mã vai trò thành tên vai trò
  const getRoleName = (role) => {
    switch (role) {
      case 1: return 'Khách hàng';
      case 2: return 'Tư vấn viên';
      case 3: return 'Nhân viên';
      case 4: return 'Admin';
      default: return 'Không xác định';
    }
  };

  // API lấy thông tin chi tiết người dùng
  const fetchUserDetail = async (userId) => {
    try {
      setDetailLoading(true);
      setUserDetail(null);
      
      const response = await fetch(`https://api-gender2.purintech.id.vn/api/User/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        setUserDetail(data.obj);
      } else {
        console.error('Lỗi khi lấy thông tin chi tiết người dùng:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chi tiết người dùng:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  // API cập nhật vai trò người dùng
  const updateUserRole = async (userId, newRole) => {
    try {
      setRoleUpdateLoading(true);
      setRoleUpdateError('');
      
      const response = await fetch(`https://api-gender2.purintech.id.vn/api/User/update-role/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        // Cập nhật lại danh sách người dùng
        fetchUsers();
        return true;
      } else {
        setRoleUpdateError(data.message || 'Có lỗi xảy ra khi cập nhật vai trò');
        return false;
      }
    } catch (error) {
      setRoleUpdateError('Lỗi kết nối mạng. Vui lòng thử lại.');
      return false;
    } finally {
      setRoleUpdateLoading(false);
    }
  };

  // API tạo người dùng mới
  const createUser = async (userData) => {
    try {
      const response = await fetch('https://api-gender2.purintech.id.vn/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        // Cập nhật lại danh sách người dùng
        fetchUsers();
        return true;
      } else {
        setFormError(data.message || 'Có lỗi xảy ra khi tạo người dùng');
        return false;
      }
    } catch (error) {
      setFormError('Lỗi kết nối mạng. Vui lòng thử lại.');
      return false;
    }
  };

  // API xóa người dùng
  const deleteUser = async (userId) => {
    try {
      setDeleteLoading(true);
      setDeleteError('');
      
      console.log('Đang xóa người dùng với ID:', userId);
      
      const response = await fetch(`https://api-gender2.purintech.id.vn/api/User/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        let errorMessage = 'Có lỗi xảy ra khi xóa người dùng';
        if (response.status === 400) {
          errorMessage = 'Không thể xóa người dùng này. Có thể do ràng buộc dữ liệu hoặc người dùng không tồn tại.';
        } else if (response.status === 401) {
          errorMessage = 'Không có quyền xóa người dùng. Vui lòng đăng nhập lại.';
        } else if (response.status === 404) {
          errorMessage = 'Không tìm thấy người dùng để xóa.';
        } else if (response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau.';
        }
        
        setDeleteError(errorMessage);
        return false;
      }

      const data = await response.json();
      console.log('API Success Response:', data);

      if (data.code === 200) {
        // Cập nhật lại danh sách người dùng
        fetchUsers();
        return true;
      } else {
        setDeleteError(data.message || 'Có lỗi xảy ra khi xóa người dùng');
        return false;
      }
    } catch (error) {
      console.error('Network error when deleting user:', error);
      setDeleteError('Lỗi kết nối mạng. Vui lòng thử lại.');
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  // Tải dữ liệu khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Lọc dữ liệu nâng cao
  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                       c.phone.toLowerCase().includes(search.toLowerCase()) ||
                       c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? c.status === filterStatus : true;
    const matchType = filterType ? c.type === filterType : true;
    return matchSearch && matchStatus && matchType;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  // Mở modal thêm người dùng mới
  const openAddModal = () => {
    setModalType('add');
    setForm({ 
      name: '', 
      email: '', 
      phone: '', 
      date: '', 
      address: '',
      password: '',
      confirmPassword: '',
      role: 4
    });
    setEditIndex(null);
    setModalOpen(true);
  };

  // Mở modal chỉnh sửa thông tin người dùng
  const openEditModal = idx => {
    setModalType('edit');
    const customer = customers[idx];
    setForm({ 
      name: customer.name, 
      email: customer.email, 
      phone: customer.phone, 
      date: customer.date,
      role: customer.role,
      address: customer.address,
      userId: customer.id
    });
    setEditIndex(idx);
    setModalOpen(true);
  };
  // Đóng modal
  const closeModal = () => setModalOpen(false);
  
  // Xử lý thay đổi giá trị trong form
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'role' ? Number(value) : value });
  };

  // Xử lý lưu thông tin người dùng
  const handleSave = async () => {
    if (!form.name || !form.email || !form.phone || !form.date) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
      return;
    }

    if (modalType === 'add') {
      if (!form.password || !form.confirmPassword) {
        setFormError('Vui lòng nhập mật khẩu và xác nhận mật khẩu.');
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setFormError('Mật khẩu và xác nhận mật khẩu không khớp.');
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
        return;
      }
      if (form.password.length < 6) {
        setFormError('Mật khẩu phải có ít nhất 6 ký tự.');
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
        return;
      }
    }

    setFormError('');
    
    if (modalType === 'add') {
      // Tạo người dùng mới qua API
      const userData = {
        fullName: form.name,
        dateOfBirth: form.date,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        address: form.address,
        phoneNumber: form.phone
      };

      const success = await createUser(userData);
      if (success) {
        setOtpEmail(form.email);
        setShowOtpPopup(true);
        closeModal();
      }
    } else if (modalType === 'edit' && editIndex !== null) {
      // Cập nhật vai trò người dùng qua API
      if (form.userId && form.role) {
        updateUserRole(form.userId, Number(form.role));
      }
      
      // Cập nhật thông tin local (nếu không có API cập nhật thông tin khác)
      const updated = [...customers];
      updated[editIndex] = { 
        ...updated[editIndex], 
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        role: form.role,
        address: form.address,
        type: getRoleName(form.role)
      };
      setCustomers(updated);
      closeModal();
    }
  };
  
  // Xử lý xóa người dùng
  const handleDelete = idx => {
    setDeleteIndex(idx);
  };
  
  // Xác nhận xóa người dùng
  const confirmDelete = async () => {
    const userToDelete = customers[deleteIndex];
    if (userToDelete && userToDelete.id) {
      const success = await deleteUser(userToDelete.id);
      if (success) {
        setDeleteIndex(null);
      }
    } else {
      // Fallback: xóa khỏi danh sách local nếu không có ID
      setCustomers(customers.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
  };
  
  // Hủy bỏ xóa người dùng
  const cancelDelete = () => setDeleteIndex(null);
  // Mở modal xem chi tiết người dùng
  const openDetailModal = idx => {
    setDetailIndex(idx);
    const user = customers[idx];
    if (user && user.id) {
      fetchUserDetail(user.id);
    }
  };
  
  // Đóng modal chi tiết người dùng
  const closeDetailModal = () => {
    setDetailIndex(null);
    setUserDetail(null);
  };

  // Xử lý cập nhật vai trò (đã chuyển vào modal chỉnh sửa)
  const handleRoleUpdate = (userId, currentRole) => {
    const newRole = prompt(`Nhập vai trò mới (1: Khách hàng, 2: Tư vấn viên, 3: Nhân viên, 4: Admin):\nVai trò hiện tại: ${getRoleName(currentRole)}`);
    
    if (newRole && !isNaN(newRole)) {
      const roleNumber = parseInt(newRole);
      if (roleNumber >= 1 && roleNumber <= 4) {
        updateUserRole(userId, roleNumber);
      } else {
        alert('Vai trò không hợp lệ. Vui lòng nhập số từ 1-4.');
      }
    }
  };

  // Làm mới dữ liệu
  const handleRefresh = () => {
    fetchUsers();
  };

  // Hàm xác thực OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError('Vui lòng nhập mã OTP');
      return;
    }
    setOtpError('');
    try {
      const response = await fetch('https://api-gender2.purintech.id.vn/api/Auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, otp })
      });
      const data = await response.json();
      if (response.ok && data.code === 200) {
        alert('Xác thực thành công!');
        setShowOtpPopup(false);
        setOtp('');
        setOtpEmail('');
        fetchUsers();
      } else {
        setOtpError(data.message || 'Mã OTP không đúng hoặc đã hết hạn');
      }
    } catch (err) {
      setOtpError('Lỗi xác thực OTP');
    }
  };

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách tài khoản</CardTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <SearchBox
                  type="text"
                  placeholder="Tìm theo tên, email hoặc SĐT"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                />
                <FilterSelect value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="confirmed">Đã xác thực email</option>
                  <option value="pending">Chưa xác thực email</option>
                </FilterSelect>
                <FilterSelect value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}>
                  <option value="">Tất cả vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Tư vấn viên">Tư vấn viên</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Khách hàng">Khách hàng</option>
                </FilterSelect>
                <Button $color="#22c55e" $textcolor="#fff" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}>
                  <FaPlus />
                </Button>
              </div>
            </CardHeader>
            
            {error && (
              <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 16, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                {error}
              </div>
            )}
            
            {roleUpdateError && (
              <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 16, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                {roleUpdateError}
              </div>
            )}
            
            {roleUpdateLoading && (
              <div style={{ color: '#059669', background: '#d1fae5', borderRadius: 8, padding: '8px 12px', marginBottom: 16, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                Đang cập nhật vai trò...
              </div>
            )}
            
            {deleteError && (
              <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 16, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                {deleteError}
              </div>
            )}
            
            {deleteLoading && (
              <div style={{ color: '#059669', background: '#d1fae5', borderRadius: 8, padding: '8px 12px', marginBottom: 16, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                Đang xóa người dùng...
              </div>
            )}
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                Đang tải dữ liệu...
              </div>
            ) : (
              <TableContainer>
                <StaffTable>
                  <thead>
                    <tr>
                      <StaffTh>ID</StaffTh>
                      <StaffTh>Họ tên</StaffTh>
                      <StaffTh>Email</StaffTh>
                      <StaffTh>Số điện thoại</StaffTh>
                      <StaffTh>Ngày sinh</StaffTh>
                      <StaffTh>Vai trò</StaffTh>
                      <StaffTh>Trạng thái</StaffTh>
                      <StaffTh>Thao tác</StaffTh>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((c, idx) => (
                      <tr key={c.id || idx}>
                        <StaffTd>{c.id}</StaffTd>
                        <StaffTd>{c.name}</StaffTd>
                        <StaffTd>{c.email}</StaffTd>
                        <StaffTd>{c.phone}</StaffTd>
                        <StaffTd>{formatDate(c.date)}</StaffTd>
                        <StaffTd>{c.type}</StaffTd>
                        <StaffTd>
                          <Badge $status={c.status}>
                            {c.status === 'confirmed' ? 'Đã xác thực' : 'Chưa xác thực'}
                          </Badge>
                        </StaffTd>
                        <StaffTd>
                          <Button className="small" onClick={() => openDetailModal(customers.indexOf(c))} title="Xem chi tiết">
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button className="small" onClick={() => openEditModal(customers.indexOf(c))}>
                            <i className="fas fa-edit"></i>
                          </Button>
                          {/* Ẩn nút xóa nếu là Admin */}
                          {c.role !== 4 && (
                            <Button className="small" $color="#ef4444" $textcolor="#fff" onClick={() => handleDelete(customers.indexOf(c))}>
                              <i className="fas fa-trash"></i>
                            </Button>
                          )}
                        </StaffTd>
                      </tr>
                    ))}
                    {paginatedCustomers.length === 0 && (
                      <tr>
                        <StaffTd colSpan={8} style={{ textAlign: 'center', color: '#888' }}>
                          {loading ? 'Đang tải...' : 'Không có tài khoản nào phù hợp.'}
                        </StaffTd>
                      </tr>
                    )}
                  </tbody>
                </StaffTable>
              </TableContainer>
            )}
            
            {/* Phân trang */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Trước</Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button key={i} onClick={() => goToPage(i + 1)} $active={currentPage === i + 1}>{i + 1}</Button>
                ))}
                <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Sau</Button>
              </div>
            )}
          </Card>
        </ContentWrapper>

        {modalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>{modalType === 'add' ? 'Thêm tài khoản' : 'Chỉnh sửa tài khoản'}</ModalTitle>
              {formError && (
                <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 8, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                  {formError}
                </div>
              )}
              <ModalForm onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <ModalLabel>Họ tên:</ModalLabel>
                <ModalInput name="name" value={form.name} onChange={handleChange} />
                <ModalLabel>Email:</ModalLabel>
                <ModalInput name="email" value={form.email} onChange={handleChange} disabled={modalType === 'edit'} />
                <ModalLabel>Số điện thoại:</ModalLabel>
                <ModalInput name="phone" value={form.phone} onChange={handleChange} />
                <ModalLabel>Ngày sinh:</ModalLabel>
                <ModalInput name="date" type="date" value={form.date} onChange={handleChange} />
                <ModalLabel>Địa chỉ:</ModalLabel>
                <ModalInput name="address" value={form.address || ''} onChange={handleChange} />
                {modalType === 'add' && (
                  <>
                    <ModalLabel>Mật khẩu:</ModalLabel>
                    <ModalInput name="password" type="password" value={form.password} onChange={handleChange} />
                    <ModalLabel>Xác nhận mật khẩu:</ModalLabel>
                    <ModalInput name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
                  </>
                )}
                <ModalLabel>Vai trò:</ModalLabel>
                <ModalSelect name="role" value={form.role} onChange={handleChange}>
                  <option value={1}>Khách hàng</option>
                  <option value={2}>Tư vấn viên</option>
                  <option value={3}>Nhân viên</option>
                  <option value={4}>Admin</option>
                </ModalSelect>
                <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
                  <Button $color="#22c55e" $textcolor="#fff" style={{ minWidth: 80, fontWeight: 600, boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }} type="submit">Lưu</Button>
                  <Button $color="#e5e7eb" $textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={closeModal} type="button">Hủy</Button>
                </div>
              </ModalForm>
            </ModalContent>
          </ModalOverlay>
        )}
        
        {deleteIndex !== null && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Xác nhận xóa tài khoản</ModalTitle>
              <div style={{ margin: '16px 0', color: '#374151', textAlign: 'center' }}>
                Bạn có chắc chắn muốn xóa tài khoản <b>{customers[deleteIndex]?.name}</b> không?
                <br />
                <small style={{ color: '#6b7280', fontSize: '13px' }}>
                  Hành động này không thể hoàn tác.
                </small>
                <br />
                <small style={{ color: '#f59e0b', fontSize: '12px', marginTop: '8px', display: 'block' }}>
                  ⚠️ Lưu ý: Một số tài khoản có thể không thể xóa do ràng buộc dữ liệu.
                </small>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                <Button $color="#ef4444" $textcolor="#fff" style={{ minWidth: 80, fontWeight: 600 }} onClick={confirmDelete} disabled={deleteLoading}>
                  {deleteLoading ? 'Đang xóa...' : 'Xóa'}
                </Button>
                <Button $color="#e5e7eb" $textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={cancelDelete} disabled={deleteLoading}>
                  Hủy
                </Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
        
        {detailIndex !== null && (
          <ModalOverlay>
            <ModalContent style={{ maxWidth: 480 }}>
              <ModalTitle>Chi tiết tài khoản</ModalTitle>
              {detailLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  Đang tải thông tin chi tiết...
                </div>
              ) : userDetail ? (
                <div style={{ padding: '8px 0', fontSize: 15 }}>
                  <b>ID:</b> {userDetail.id}<br />
                  <b>Họ tên:</b> {userDetail.fullName}<br />
                  <b>Email:</b> {userDetail.email}<br />
                  <b>Số điện thoại:</b> {userDetail.phoneNumber}<br />
                  <b>Địa chỉ:</b> {userDetail.address || 'Chưa cập nhật'}<br />
                  <b>Ngày sinh:</b> {formatDate(userDetail.dateOfBirth)}<br />
                  <b>Vai trò:</b> {getRoleName(userDetail.role)}<br />
                                  <b>Trạng thái email:</b> <Badge $status={userDetail.isEmailVerified ? 'confirmed' : 'pending'}>
                  {userDetail.isEmailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </Badge><br />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#ef4444' }}>
                  Không thể tải thông tin chi tiết
                </div>
              )}
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button $color="#22c55e" $textcolor="#fff" onClick={closeDetailModal}>Đóng</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}

        {showOtpPopup && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Xác thực tài khoản</ModalTitle>
              <div style={{ marginBottom: 12 }}>
                Nhập mã OTP đã gửi về email <b>{otpEmail}</b>
              </div>
              <ModalInput
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
              {otpError && <div style={{ color: 'red', marginBottom: 8 }}>{otpError}</div>}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
                <Button $color="#22c55e" $textcolor="#fff" onClick={handleVerifyOtp}>Xác thực</Button>
                <Button $color="#e5e7eb" $textcolor="#1f2937" onClick={() => setShowOtpPopup(false)}>Đóng</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </>
  );
};

export default AdminTaiKhoan;
