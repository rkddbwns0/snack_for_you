import { useState } from 'react';
import { useAuth } from '../context/context.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/auth.css';

export const EditUser = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const user_id = location.pathname.split('/')[2];
    const [nickname, setNickname] = useState<string>('');
    const [dupMsg, setDupMsg] = useState<string>('');
    const [dupNickname, setDupNickname] = useState<boolean>(false);

    const handleDupCheck = async () => {
        if (nickname === '') {
            setDupMsg('닉네임을 입력해 주세요.');
            setDupNickname(false);
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/dup`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    nickname,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                setDupMsg(errorData.message);
                setDupNickname(false);
            }

            const data = await response.json();

            setDupNickname(true);
            setDupMsg(data.message);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdateUser = async () => {
        if (nickname === '') {
            alert('변경할 닉네임을 입력해 주세요.');
            return;
        }

        if (dupNickname === false) {
            alert('중복확인을 완료해 주세요.');
            return;
        }

        console.log(JSON.stringify({ nickname }));

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${user_id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    nickname,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                alert(errorData.message);
            }

            const data = await response.json();

            alert(data.message);
            navigation('/myPage');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="auth-page-container">
                    <div className="auth-content-wrapper">
                        <div className="auth-form-card edit-user-form">
                            <h1 className="auth-title">닉네임 변경</h1>
                            
                            <div className="edit-user-section">
                                <div className="auth-form-group">
                                    <label className="auth-form-label">새 닉네임</label>
                                    <div className="auth-duplicate-container">
                                        <input
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                            className="auth-form-input auth-duplicate-input"
                                            type="text"
                                            placeholder="변경할 닉네임을 입력하세요"
                                        />
                                        <button 
                                            className="auth-duplicate-button"
                                            onClick={handleDupCheck}
                                        >
                                            중복확인
                                        </button>
                                    </div>
                                    {dupMsg && (
                                        <div className={`auth-message ${dupNickname ? 'success' : 'error'}`}>
                                            {dupMsg}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="edit-user-section">
                                <button 
                                    className="auth-submit-button"
                                    onClick={handleUpdateUser}
                                >
                                    닉네임 변경
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
