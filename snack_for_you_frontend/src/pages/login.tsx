import { use, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className="login-container">
            <div className="login-title">
                <p>로그인</p>
            </div>
            <div className="login-input-container">
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="id-input"
                    type="text"
                    placeholder="아이디"
                />
                <div className="password-container">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="password-icon">
                        {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                    </span>
                </div>
            </div>
            <div className="login-menu-container">
                <a>아이디 찾기</a>
                <a>비밀번호 찾기</a>
                <a onClick={() => navigation('/signup')}>회원가입</a>
            </div>
            <div className="login-button-container">
                <button>로그인</button>
            </div>
        </div>
    );
};
