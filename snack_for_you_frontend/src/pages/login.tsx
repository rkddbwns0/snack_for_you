import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import '../css/login.css';
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
                    onKeyDown={(e) => handleEnter(e)}
                />
                <div className="password-container">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        onKeyDown={(e) => handleEnter(e)}
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
                <button onClick={handleEnter}>로그인</button>
            </div>
        </div>
    );
};
