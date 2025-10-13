import { useAuth } from '../context/context.tsx';
import { FaRegCircleUser } from 'react-icons/fa6';
import '../css/myPage.css';
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
        <div className="mypage-container">
            <div>
                <h3>마이페이지</h3>
            </div>
            <div className="mypage-content">
                <div className="user-info">
                    <FaRegCircleUser className="user-icon" size={25} />
                    <p>
                        {user?.name}({user?.nickname})
                    </p>
                </div>
                <div className="mypage-menu">
                    <ul>
                        <li onClick={() => navigation('/orderList')}>주문내역</li>
                        <li
                            onClick={() => {
                                navigation('/address_info');
                            }}
                        >
                            배송지 관리
                        </li>
                        <li onClick={() => navigation(`/edit_user/${user?.user_id}`)}>닉네임 변경</li>
                        <li onClick={handleLogout}>로그아웃</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
