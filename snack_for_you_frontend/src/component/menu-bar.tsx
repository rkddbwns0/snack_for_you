import { useEffect, useState } from 'react';
import '../css/menu-bar.css';
import { useNavigate } from 'react-router-dom';

export const MenuBar = () => {
    const navigation = useNavigate();
    const [searchView, setSearchView] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState<[]>([]);

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
            if (searchText === '') {
                alert('검색어를 입력해 주세요.')
                return;
            }
            navigation('/search', {state: {keyword: searchText}})
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
                            <li
                                onClick={() =>
                                    navigation(`/snack_list/${item.category_id}`, {
                                        state: { category_id: item.category_id, name: item.name },
                                    })
                                }
                            >
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
