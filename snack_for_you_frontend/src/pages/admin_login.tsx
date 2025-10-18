import { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import '../css/admin_login.css';

export const AdminLogin = () => {
    const [adminId, setAdminId] = useState<string>('');
    const [adminPassword, setAdminPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleAdminLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    admin_id: adminId,
                    password: adminPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                alert(errorData.message || '오류가 발생했습니다 다시 시도해 주세요.');
            }

            const data = await response.json();

            sessionStorage.setItem('access_token', data.access_token);

            window.location.href = '/admin';
        } catch (e) {
            console.error(e);
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
