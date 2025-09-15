import logoImg from '../img/snack_for_you_logo.png';

export const AppHeader = () => {
    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={logoImg} className="App-logo" />
                <h3 onClick={() => window.location.replace('/')}>Snack For You</h3>
            </div>
            <div className="menu-container">
                <a href="/login">로그인</a>
                <a>장바구니</a>
                <a>마이페이지</a>
            </div>
        </header>
    );
};
