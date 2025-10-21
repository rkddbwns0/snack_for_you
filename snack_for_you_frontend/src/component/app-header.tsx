import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import logoImg from '../img/snack_for_you_logo.png';

export const AppHeader = () => {
    const navigation = useNavigate();
    const { user } = useAuth();

    const handleMyPage = () => {
        if (!user) {
            alert('로그인 후 이용해 주세요.');
            return;
        }
        navigation('/myPage');
    };

    const handleCart = () => {
        if (!user) {
            alert('로그인 후 이용해 주세요.');
            return;
        }
        navigation('/cart');
    };

    const handleFavorite = () => {
        if (!user) {
            alert('로그인 후 이용해 주세요.');
            return;
        }
        navigation('/favorite');
    };

    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={logoImg} className="App-logo" />
                <h3 onClick={() => window.location.replace('/')}>Snack For You</h3>
            </div>
            <div className="menu-container">
                {user ? <p>{user.nickname}님 환영합니다!</p> : <a href="/login">로그인</a>}
                <a onClick={handleFavorite}>좋아요</a>
                <a onClick={handleCart}>장바구니</a>
                <a onClick={handleMyPage}>마이페이지</a>
            </div>
        </header>
    );
};
