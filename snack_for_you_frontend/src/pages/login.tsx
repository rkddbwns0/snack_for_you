import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import '../css/auth.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        if (id === '' || password === '') {
            alert('입력 정보를 모두 입력해 주세요.');
            return;
        }
        try {
            console.log(id, password);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    user_id: id,
                    password,
                }),
                credentials: 'include',
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
            navigation('/');
        } catch (e) {
            console.error(e);
        }
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="auth-page-container">
                    <div className="auth-content-wrapper">
                        <div className="auth-form-card">
                            <h1 className="auth-title">로그인</h1>
                            
                            <div className="auth-form-group">
                                <label className="auth-form-label">아이디</label>
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="auth-form-input"
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                            </div>
                            
                            <div className="auth-form-group">
                                <label className="auth-form-label">비밀번호</label>
                                <div className="auth-password-container">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="auth-form-input"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="비밀번호를 입력하세요"
                                        onKeyDown={(e) => handleEnter(e)}
                                    />
                                    <span 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="auth-password-icon"
                                    >
                                        {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                                    </span>
                                </div>
                            </div>
                            
                            <button 
                                className="auth-submit-button"
                                onClick={handleLogin}
                            >
                                로그인
                            </button>
                            
                            <div className="auth-menu-container">
                                <div className="login-menu-links">
                                    <span className="auth-menu-link">아이디 찾기</span>
                                    <span className="auth-menu-link">비밀번호 찾기</span>
                                    <span 
                                        className="auth-menu-link"
                                        onClick={() => navigation('/signup')}
                                    >
                                        회원가입
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
