import { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import '../css/admin_login.css';

export const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="admin-login-container">
            <header className="admin-login-header">
                <h3>관리자 로그인</h3>
            </header>
            <div className="admin-input-container">
                <input className="admin-input" type="text" placeholder="아이디를 입력해 주세요." />
                <div className="admin-password-container">
                    <input
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
                <button className="admin-login-button">로그인</button>
            </div>
        </div>
    );
};
