import { useAuth } from '../context/context.tsx';
import { FaUserCircle } from 'react-icons/fa';
import '../css/common.css';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
    const navigation = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                alert(errorData.message || '오류가 발생했습니다 다시 시도해 주시오세요.');
            }

            sessionStorage.clear();
            setUser(null);
            navigation('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="mypage-container">
                    <div className="mypage-content-wrapper">
                        <div className="mypage-user-card">
                            <div className="mypage-user-info">
                                <FaUserCircle className="mypage-user-icon" />
                                <h2 className="mypage-user-name">
                                    {user?.name} ({user?.nickname})
                                </h2>
                            </div>
                        </div>
                        
                        <div className="mypage-menu-card">
                            <h2 className="page-title">마이페이지</h2>
                            <ul className="mypage-menu-list">
                                <li className="mypage-menu-item" onClick={() => navigation('/orderList')}>
                                    <p className="mypage-menu-item-text">주문내역</p>
                                </li>
                                <li className="mypage-menu-item" onClick={() => navigation('/address_info')}>
                                    <p className="mypage-menu-item-text">배송지 관리</p>
                                </li>
                                <li className="mypage-menu-item" onClick={() => navigation('/reviewList')}>
                                    <p className="mypage-menu-item-text">리뷰 내역</p>
                                </li>
                                <li className="mypage-menu-item" onClick={() => navigation(`/edit_user/${user?.user_id}`)}>
                                    <p className="mypage-menu-item-text">닉네임 변경</p>
                                </li>
                                <li className="mypage-menu-item" onClick={handleLogout}>
                                    <p className="mypage-menu-item-text">로그아웃</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
