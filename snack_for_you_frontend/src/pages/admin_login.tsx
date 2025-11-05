import React, { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import '../css/admin_login.css';
import { AdminAuthApi } from '../api/admin.auth.api.tsx';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const navigation = useNavigate();
    const adminAuthApi = new AdminAuthApi();
    const [adminId, setAdminId] = useState<string>('');
    const [adminPassword, setAdminPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleAdminLogin = async () => {
        const data = await adminAuthApi.adminLogin(adminId, adminPassword);
        console.log(data);
        if (data?.status === 201) {
            sessionStorage.setItem('access_token', data?.data.access_token);
            sessionStorage.setItem('userType', 'admin');
            navigation('/admin/*');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <header className="admin-login-header">
                    <h3>관리자 로그인</h3>
                </header>
                <div className="admin-input-container">
                    <input
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="admin-input"
                        type="text"
                        placeholder="아이디를 입력해 주세요."
                    />
                    <div className="admin-password-container">
                        <input
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="admin-input-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="비밀번호를 입력해 주세요."
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="password-icon">
                            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                        </span>
                    </div>
                </div>
                <div className="admin-login-button-container">
                    <button className="admin-login-button" onClick={handleAdminLogin}>
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
};
