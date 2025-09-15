import { useState } from 'react';
import '../css/menu-bar.css';

export const MenuBar = () => {
    const [searchView, setSearchView] = useState(false);
    const [searchText, setSearchText] = useState('');
    const enterButton = () => {
        alert(`${searchText}`);
    };
    const handleSearchView = () => {
        if (searchView) {
            setSearchView(false);
        } else {
            setSearchView(true);
            setSearchText('');
        }
    };

    const handleSearchEnter = (e: any) => {
        if (e.key === 'Enter') {
            enterButton();
        }
    };

    return (
        <div className="menu-bar-container">
            <ul className="menu-category">
                <li>초콜릿</li>
                <li>젤리</li>
                <li>과자</li>
                <li>아이스크림</li>
            </ul>
            <div className="search-container">
                <span className="search-icon" onClick={handleSearchView}>
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="간식을 검색해 보세요"
                    className={`search-bar ${searchView ? 'active' : ''}`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => handleSearchEnter(e)}
                />
                <button className="search-button" onClick={handleSearchEnter}>
                    검색
                </button>
            </div>
        </div>
    );
};
