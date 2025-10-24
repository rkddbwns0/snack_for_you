import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';

export const Signup = () => {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [dupId, setDupId] = useState<boolean>(false);
    const [dupNickname, setDupNickname] = useState<boolean>(false);
    const [idMsg, setIdMsg] = useState<string>('');
    const [nicknameMsg, setNicknameMsg] = useState<string>('');

    const handleDupCheck = async (type: string) => {
        if (type === 'id' && id === '') {
            setDupId(false);
            setIdMsg('아이디를 입력해 주세요.');
            return;
        } else if (type === 'nickname' && nickname === '') {
            setDupNickname(false);
            setNicknameMsg('닉네임을 입력해 주세요.');
            return;
        }
        try {
            const body = type === 'id' ? { id } : { nickname };

            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/dup`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                if (type === 'id') {
                    setDupId(false);
                    setIdMsg(errorData.message);
                } else {
                    setDupNickname(false);
                    setNicknameMsg(errorData.message);
                }
            }

            const data = await response.json();

            if (type === 'id') {
                setDupId(true);
                setIdMsg(data?.message);
            } else {
                setDupNickname(true);
                setNicknameMsg(data?.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSignup = async () => {
        if (id === '' || password === '' || name === '' || nickname === '') {
            alert('입력 정보를 모두 입력해 주세요.');
            return;
        }
        if (dupId === false || dupNickname === false) {
            alert('중복 검사를 완료해 주세요.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    password,
                    name,
                    nickname,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                alert(errorData.message || '오류가 발생했습니다 다시 시도해 주시오세요.');
            }

            const data = await response.json();

            alert(data.message);
            navigation('/login');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="auth-page-container">
                    <div className="auth-content-wrapper">
                        <div className="auth-form-card">
                            <h1 className="auth-title">회원가입</h1>
                            
                            <div className="signup-form-section">
                                <div className="auth-form-group">
                                    <label className="auth-form-label">아이디</label>
                                    <div className="auth-duplicate-container">
                                        <input 
                                            value={id} 
                                            onChange={(e) => setId(e.target.value)} 
                                            className="auth-form-input auth-duplicate-input"
                                            type="text" 
                                            placeholder="아이디를 입력하세요" 
                                        />
                                        <button 
                                            className="auth-duplicate-button"
                                            onClick={() => handleDupCheck('id')}
                                        >
                                            중복확인
                                        </button>
                                    </div>
                                    {idMsg && (
                                        <div className={`auth-message ${dupId ? 'success' : 'error'}`}>
                                            {idMsg}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="signup-form-section">
                                <div className="auth-form-group">
                                    <label className="auth-form-label">비밀번호</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="auth-form-input"
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                    />
                                </div>
                            </div>

                            <div className="signup-form-section">
                                <div className="auth-form-group">
                                    <label className="auth-form-label">이름</label>
                                    <input 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="auth-form-input"
                                        type="text" 
                                        placeholder="이름을 입력하세요" 
                                    />
                                </div>
                            </div>

                            <div className="signup-form-section">
                                <div className="auth-form-group">
                                    <label className="auth-form-label">닉네임</label>
                                    <div className="auth-duplicate-container">
                                        <input
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                            className="auth-form-input auth-duplicate-input"
                                            type="text"
                                            placeholder="닉네임을 입력하세요"
                                        />
                                        <button 
                                            className="auth-duplicate-button"
                                            onClick={() => handleDupCheck('nickname')}
                                        >
                                            중복확인
                                        </button>
                                    </div>
                                    {nicknameMsg && (
                                        <div className={`auth-message ${dupNickname ? 'success' : 'error'}`}>
                                            {nicknameMsg}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                className="auth-submit-button"
                                onClick={handleSignup}
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
