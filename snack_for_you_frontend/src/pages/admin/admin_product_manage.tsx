import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Product {
    snack_id: number;
    snack_name: string;
    price: number;
    stock: number;
    category_name: string;
    snack_image: string;
}

export const AdminProductManage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: API에서 제품 목록 조회
        setProducts([]);
        setLoading(false);
    }, []);

    const handleEdit = (id: number) => {
        // TODO: 제품 수정 기능
        console.log('제품 수정:', id);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('이 제품을 삭제하시겠습니까?')) {
            // TODO: API로 제품 삭제
            console.log('제품 삭제:', id);
        }
    };

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>제품 관리</h1>
                <p>등록된 제품을 관리하세요</p>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-empty-message">
                        <p>로딩 중...</p>
                    </div>
                ) : products.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>이미지</th>
                                <th>제품명</th>
                                <th>카테고리</th>
                                <th>가격</th>
                                <th>재고</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.snack_id}>
                                    <td>
                                        <img
                                            src={product.snack_image}
                                            alt={product.snack_name}
                                            className="admin-table-image"
                                        />
                                    </td>
                                    <td>{product.snack_name}</td>
                                    <td>{product.category_name}</td>
                                    <td>{product.price.toLocaleString()}원</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <div className="admin-table-actions">
                                            <button
                                                className="admin-edit-btn"
                                                onClick={() => handleEdit(product.snack_id)}
                                            >
                                                <FaEdit /> 수정
                                            </button>
                                            <button
                                                className="admin-delete-btn"
                                                onClick={() => handleDelete(product.snack_id)}
                                            >
                                                <FaTrash /> 삭제
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-message">
                        <p>등록된 제품이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
