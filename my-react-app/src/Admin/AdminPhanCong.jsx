import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';

const MainContent = styled.main`
  padding: 120px 0 24px 250px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  width: 100vw;
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 16px;
  }
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 1;
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3b82f6;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`;

const ControlsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const FiltersGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
`;

const SearchInput = styled.input`
  padding: 12px 20px 12px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  min-width: 300px;
  background: #f9fafb url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%239ca3af" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>') no-repeat 16px center;
  background-size: 18px;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;
  }

  &.secondary:hover {
    background: #e5e7eb;
  }

  &.small {
    padding: 8px 16px;
    font-size: 12px;
  }

  &.assign {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  &.assign:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &.edit {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
  }

  &.edit:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }

  &.delete {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  &.delete:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TaskCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3b82f6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const TaskTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  flex: 1;
`;

const TaskDepartment = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
`;

const TaskPriority = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TaskDescription = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0 0 20px 0;
  line-height: 1.6;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.85rem;
  color: #9ca3af;
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
`;

const TaskProgress = styled.div`
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.5s ease;
  border-radius: 6px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  text-align: center;
  font-weight: 600;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const StaffSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const StaffTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '👥';
    font-size: 1.8rem;
  }
`;

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const StaffCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.className === 'available' ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #ef4444, #dc2626)'};
  }

  &.available {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  }

  &.busy {
    border-color: #ef4444;
    background: linear-gradient(135deg, #fef2f2, #fef2f2);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StaffAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 auto 16px auto;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const StaffName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
  font-size: 1rem;
`;

const StaffDept = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 12px;
`;

const StaffStatus = styled.div`
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.available {
    background: #d1fae5;
    color: #065f46;
  }

  &.busy {
    background: #fee2e2;
    color: #991b1b;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  min-width: 450px;
  max-width: 550px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '📋';
    font-size: 1.8rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
  font-size: 14px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  background: #f9fafb;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s;
  background: #f9fafb;
  font-family: inherit;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  opacity: 0.5;
`;

const AppointmentSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
`;

const AppointmentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '📅';
    font-size: 1.8rem;
  }
`;

const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
`;

const AppointmentCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &.pending {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
  }

  &.assigned {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  }

  &.completed {
    border-color: #10b981;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  }
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CustomerName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const AppointmentDate = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const ConsultationType = styled.div`
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
`;

const AppointmentStatus = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const AppointmentDetails = styled.div`
  margin-bottom: 12px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.85rem;
`;

const DetailLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #374151;
`;

const AppointmentActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ConsultantModal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  min-width: 500px;
  max-width: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }
`;

const ConsultantModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '👨‍⚕️';
    font-size: 1.8rem;
  }
`;

const ConsultantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 24px;
`;

const ConsultantCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &.available {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  }

  &.busy {
    border-color: #ef4444;
    background: linear-gradient(135deg, #fef2f2, #fef2f2);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  }
`;

const ConsultantAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 auto 12px auto;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const ConsultantName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const ConsultantSpecialization = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const ConsultantRating = styled.div`
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 600;
  margin-bottom: 4px;
`;

const ConsultantStatus = styled.div`
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: uppercase;

  &.available {
    background: #d1fae5;
    color: #065f46;
  }

  &.busy {
    background: #fee2e2;
    color: #991b1b;
  }
`;

const UnifiedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UnifiedCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3b82f6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }

  &.pending {
    border-left-color: #f59e0b;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
  }

  &.assigned {
    border-left-color: #3b82f6;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  }

  &.completed {
    border-left-color: #10b981;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  }

  &.in-progress {
    border-left-color: #3b82f6;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const CardSubtitle = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const CardStatus = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  &.pending {
    background: #fef3c7;
    color: #92400e;
  }

  &.assigned {
    background: #dbeafe;
    color: #1e40af;
  }

  &.completed {
    background: #d1fae5;
    color: #065f46;
  }

  &.in-progress {
    background: #dbeafe;
    color: #1e40af;
  }
`;

const CardDescription = styled.div`
  font-size: 1rem;
  color: #374151;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #6b7280;
`;

const CardNotes = styled.div`
  font-size: 0.85rem;
  color: #374151;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  line-height: 1.4;
`;

const CardProgress = styled.div`
  margin-bottom: 16px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const AdminPhanCong = () => {
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    department: 'all'
  });

  // State for appointments from API
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Mock data for consultants
  const [consultants, setConsultants] = useState([
    {
      id: 1045,
      name: 'Dr. Nguyễn Thị Huyền',
      email: 'matchamint120404@gmail.com',
      specialization: 'Sức khỏe sinh sản',
      experience: '8 năm',
      rating: 4.8,
      status: 'available',
      avatar: 'H',
      appointmentsCount: 12
    },
    {
      id: 2,
      name: 'Dr. Phạm Văn Minh',
      email: 'taetae30121995112@gmail.com',
      specialization: 'Tâm lý học',
      experience: '6 năm',
      rating: 4.6,
      status: 'busy',
      avatar: 'M',
      appointmentsCount: 8
    },
    {
      id: 1047,
      name: 'Dr. Trần Thị Lan',
      email: 'user3@example.com',
      specialization: 'Dinh dưỡng',
      experience: '5 năm',
      rating: 4.9,
      status: 'available',
      avatar: 'L',
      appointmentsCount: 15
    },
    {
      id: 1048,
      name: 'Dr. Hoàng Văn Nam',
      email: 'user4@example.com',
      specialization: 'Sức khỏe tổng quát',
      experience: '10 năm',
      rating: 4.7,
      status: 'available',
      avatar: 'N',
      appointmentsCount: 20
    }
  ]);


  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ phân công';
      case 'completed': return 'Hoàn thành';
      default: return 'Chờ phân công';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAssignTask = (taskId, staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, assignedTo: staffMember.name, status: 'in-progress' }
        : task
    ));
    setShowAssignModal(false);
    setSelectedTask(null);
  };

  const handleCreateTask = () => {
    if (newTask.title && newTask.description && newTask.deadline) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'pending',
        assignedTo: null,
        createdAt: new Date().toISOString().split('T')[0],
        progress: 0
      };
      setTasks(prev => [...prev, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        deadline: '',
        department: 'all'
      });
      setShowCreateModal(false);
    }
  };

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/get-all-advice-appointments', {
          headers: {
            'accept': '*/*',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.obj && Array.isArray(data.obj)) {
            // Transform API data to match our component structure
            const transformedAppointments = data.obj.map(item => ({
              id: item.id,
              customerName: item.fullName || item.customerName,
              customerEmail: item.email || item.customerEmail,
              customerPhone: item.phoneNumber || item.phone,
              appointmentDate: item.appointmentDate,
              appointmentTime: item.appointmentTime || item.time,
              consultationType: item.consultationType || item.serviceType,
              status: item.serviceStatus === 0 ? 'pending' : 
                     [2, 3, 4].includes(item.serviceStatus)  ? 'assigned' : 
                     item.serviceStatus >= 5 ? 'completed' : 'unidentified',
              assignedConsultant: item.consultantName || item.assignedConsultant,
              notes: item.note || item.description || 'Không có ghi chú'
            }));
            const filteredAppointments = transformedAppointments.filter(item => item.status !== 'unidentified');
            setAppointments(filteredAppointments);
          } else {
            setAppointments([]);
          }
        } else {
          console.error('Failed to fetch appointments');
          setAppointments([]);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  const stats = [
    {
      icon: '📋',
      number: tasks.length,
      label: 'Tổng nhiệm vụ',
      color: '#3b82f6'
    },
    {
      icon: '⏳',
      number: tasks.filter(t => t.status === 'pending').length,
      label: 'Chờ phân công',
      color: '#f59e0b'
    },
    {
      icon: '✅',
      number: tasks.filter(t => t.status === 'completed').length,
      label: 'Hoàn thành',
      color: '#10b981'
    },
    {
      icon: '📅',
      number: appointments.length,
      label: 'Lịch tư vấn',
      color: '#8b5cf6'
    }
  ];

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <PageHeader>
            <PageTitle>Phân công công việc</PageTitle>
            <PageSubtitle>Quản lý và phân công các nhiệm vụ cho nhân viên một cách hiệu quả</PageSubtitle>
          </PageHeader>



          <ControlsSection>
            <FiltersGroup>
              <SearchInput
                type="text"
                placeholder="Tìm kiếm nhiệm vụ hoặc lịch hẹn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ phân công</option>
                <option value="completed">Hoàn thành</option>
                <option value="assigned">Đã phân công</option>
              </FilterSelect>
            </FiltersGroup>
          </ControlsSection>

          <UnifiedGrid>
            {/* Tasks Section */}
            {filteredTasks.map((task) => (
              <UnifiedCard key={`task-${task.id}`} className={task.status}>
                <CardHeader>
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardSubtitle>{task.department}</CardSubtitle>
                  </div>
                  <CardStatus className={task.status}>
                    {getStatusText(task.status)}
                  </CardStatus>
                </CardHeader>
                
                <CardDescription>{task.description}</CardDescription>
                
                <CardMeta>
                  <span>Hạn: {task.deadline}</span>
                  <span style={{ color: getPriorityColor(task.priority) }}>
                    {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                </CardMeta>

                <CardProgress>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${task.progress}%` }} />
                  </ProgressBar>
                  <ProgressText>{task.progress}% hoàn thành</ProgressText>
                </CardProgress>

                <CardActions>
  {appointment.status === 'completed' ? (
    <span style={{ fontSize: '14px', color: '#10b981', background: '#d1fae5', padding: '8px 12px', borderRadius: '8px', fontWeight: '600' }}>
      ✅ Đã hoàn thành
    </span>
  ) : appointment.status === 'assigned' && appointment.assignedConsultant ? (
    <span style={{ fontSize: '14px', color: '#6b7280', background: '#f3f4f6', padding: '8px 12px', borderRadius: '8px' }}>
      👨‍⚕️ {appointment.assignedConsultant}
    </span>
  ) : appointment.status === 'pending' ? (
    <Button
      className="small assign"
      onClick={() => setSelectedAppointment(appointment)}
    >
      Phân công
    </Button>
  ) : null}
  
  <Button
  className="small edit"
  onClick={() => setSelectedAppointment(appointment)}
>
  Sửa
</Button>
  <Button className="small delete">Xóa</Button>
</CardActions>

              </UnifiedCard>
            ))}

            {/* Appointments Section */}
            {loadingAppointments ? (
              <UnifiedCard>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                  <div style={{ color: '#6b7280' }}>Đang tải danh sách lịch tư vấn...</div>
                </div>
              </UnifiedCard>
            ) : appointments.length === 0 ? (
              <UnifiedCard>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📅</div>
                  <div style={{ color: '#6b7280' }}>Chưa có lịch tư vấn nào</div>
                </div>
              </UnifiedCard>
            ) : (
              appointments.map((appointment) => (
                <UnifiedCard key={`appointment-${appointment.id}`} className={appointment.status}>
                  <CardHeader>
                    <div>
                      <CardTitle>{appointment.customerName}</CardTitle>
                      <CardSubtitle>{appointment.appointmentDate} - {appointment.appointmentTime}</CardSubtitle>
                    </div>
                    <CardStatus className={appointment.status}>
                      {appointment.status === 'pending' ? 'Chờ phân công' : appointment.status === 'assigned' ? 'Đã phân công' : 'Hoàn thành'}
                    </CardStatus>
                  </CardHeader>
                  
                  <CardDescription>{appointment.consultationType}</CardDescription>
                  
                  <CardMeta>
                    <span>Email: {appointment.customerEmail}</span>
                    <span>SĐT: {appointment.customerPhone}</span>
                  </CardMeta>

                  <CardNotes>
                    <strong>Ghi chú:</strong> {appointment.notes}
                  </CardNotes>

                  <CardActions>
                    {appointment.status === 'completed' ? (
                      <span style={{ fontSize: '14px', color: '#10b981', background: '#d1fae5', padding: '8px 12px', borderRadius: '8px', fontWeight: '600' }}>
                        ✅ Đã hoàn thành
                      </span>
                    ) : appointment.assignedConsultant ? (
                      <span style={{ fontSize: '14px', color: '#6b7280', background: '#f3f4f6', padding: '8px 12px', borderRadius: '8px' }}>
                        👨‍⚕️ {appointment.assignedConsultant}
                      </span>
                    ) : (
                      <Button
                        className="small assign"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        Phân công
                      </Button>
                    )}
                    
                     {appointment.status === 'assigned' && (
    <Button
      className="small edit"
      onClick={() => setSelectedAppointment(appointment)}
    >
      Sửa
    </Button>
  )}
                    
                    <Button className="small delete" >
                      Xóa
                    </Button>
                  </CardActions>
                </UnifiedCard>
              ))
            )}
          </UnifiedGrid>
        </ContentWrapper>
      </MainContent>

      {/* Assign Task Modal */}
      {showAssignModal && selectedTask && (
        <ModalOverlay onClick={() => setShowAssignModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Phân công nhiệm vụ</ModalTitle>
            <p style={{ marginBottom: '24px', color: '#6b7280', fontSize: '1rem' }}>
              Chọn nhân viên để phân công nhiệm vụ: <strong>{selectedTask.title}</strong>
            </p>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {staff.filter(member => member.status === 'available').map((member) => (
                <div
                  key={member.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  onClick={() => handleAssignTask(selectedTask.id, member.id)}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    marginRight: '16px'
                  }}>
                    {member.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '1rem' }}>{member.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{member.department}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <ModalActions>
              <Button className="secondary" onClick={() => setShowAssignModal(false)}>
                Hủy
              </Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}



      {/* Consultant Assignment Modal */}
      {selectedAppointment && (
        <ModalOverlay onClick={() => setSelectedAppointment(null)}>
          <ConsultantModal onClick={(e) => e.stopPropagation()}>
            <ConsultantModalTitle>Phân công tư vấn</ConsultantModalTitle>
            <p style={{ marginBottom: '24px', color: '#6b7280', fontSize: '1rem' }}>
              Chọn tư vấn viên cho lịch hẹn: <strong>{selectedAppointment.customerName}</strong>
            </p>
            
            <ConsultantGrid>
              {consultants.map((consultant) => (
                <ConsultantCard
                  key={consultant.id}
                  className={consultant.status}
                  onClick={async () => {
  if (consultant.status === 'busy') return;

  try {
    const token = localStorage.getItem('token');
    const appointmentId = selectedAppointment.id;

    // Lấy note và suggestion hiện tại (nếu có)
    const note = selectedAppointment.notes || '';
    const suggestion = ''; // nếu bạn không lưu suggestion thì để rỗng

    const response = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-result/${appointmentId}/approve-for-consultant`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        serviceStatus: 2,
        note: note,
        suggestion: suggestion,
        consultantId: consultant.id
      })
    });

    if (response.ok) {
      // Cập nhật appointment trong state
      setAppointments(prev =>
        prev.map(app =>
          app.id === appointmentId
            ? { ...app, status: 'assigned', assignedConsultant: consultant.name }
            : app
        )
      );

      alert(`Đã phân công và hoàn thành lịch tư vấn với ${consultant.name}`);
    } else {
      alert('Lỗi khi gửi yêu cầu cập nhật');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Lỗi kết nối máy chủ');
  }

  setSelectedAppointment(null);
}}

                >
                  <ConsultantAvatar>{consultant.avatar}</ConsultantAvatar>
                  <ConsultantName>{consultant.name}</ConsultantName>
                  <ConsultantSpecialization>{consultant.specialization}</ConsultantSpecialization>
                  <ConsultantRating>Đánh giá: {consultant.rating.toFixed(1)}/5</ConsultantRating>
                  <ConsultantStatus className={consultant.status}>
                    {consultant.status === 'available' ? 'Có sẵn' : 'Bận'}
                  </ConsultantStatus>
                </ConsultantCard>
              ))}
            </ConsultantGrid>
            
            <ModalActions>
              <Button className="secondary" onClick={() => setSelectedAppointment(null)}>
                Hủy
              </Button>
            </ModalActions>
          </ConsultantModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminPhanCong; 