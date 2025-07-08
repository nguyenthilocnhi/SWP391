import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mặc định: chưa đăng nhập, role là 'guest'
  const [user, setUser] = useState({
    name: "",
    role: "guest", // 'admin_manager', 'admin', 'manager', 'customer', ...
  });

  // Hàm đăng nhập giả lập
  const login = (name, role) => setUser({ name, role });
  const logout = () => setUser({ name: "", role: "guest" });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 