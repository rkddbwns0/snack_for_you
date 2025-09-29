import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css';

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
        <div className="signup-container">
            <div className="signup-title">
                <p>회원가입</p>
            </div>
            <div className="signup-input-container">
                <div className="id-container">
                    <input value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder="아이디" />
                    <button onClick={() => handleDupCheck('id')}>아이디 확인</button>
                    <p style={{ color: dupId ? 'green' : 'red' }}>{idMsg}</p>
                </div>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                />
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="이름" />
                <div className="nickname-container">
                    <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        type="text"
                        placeholder="닉네임"
                    />
                    <button onClick={() => handleDupCheck('nickname')}>닉네임 확인</button>
                    <p style={{ color: dupNickname ? 'green' : 'red' }}>{nicknameMsg}</p>
                </div>
            </div>
            <div className="signup-button-container">
                <button onClick={handleSignup}>회원가입</button>
            </div>
        </div>
    );
};
