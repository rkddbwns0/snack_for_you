import { useEffect, useState } from 'react';
import '../css/menu-bar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';

export const MenuBar = () => {
    const navigation = useNavigate();
    const [searchView, setSearchView] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState<[]>([]);
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

    const snackCategory = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/category`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
            }

            const data = await response.json();
            setCategory(data.category);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        snackCategory();
    }, []);

    return (
        <div className="menu-bar-container">
            {category.length > 0 ? (
                category.map((item: any, index: number) => {
                    return (
                        <ul className="menu-category" key={index}>
                            <li onClick={() => navigation(`/snack_list/${item.category_id}`, { state: item.name })}>
                                {item.name}
                            </li>
                        </ul>
                    );
                })
            ) : (
                <p>현재 쇼핑 카테고리가 없습니다</p>
            )}
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
