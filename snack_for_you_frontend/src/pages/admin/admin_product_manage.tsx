import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AdminApi } from '../../api/admin.api.tsx';

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
    const [snackList, setSnackList] = useState<any>([]);
    const adminApi = new AdminApi();

    const getAllSnackList = async () => {
        const data = await adminApi.getAllSnackList();
        setSnackList(data);
    };

    useEffect(() => {
        getAllSnackList();
    }, []);

    const handleEdit = (id: number) => {
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
                {snackList ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>이미지</th>
                                <th>제품명</th>
                                <th>카테고리</th>
                                <th>가격</th>
                                <th>재고</th>
                                <th>등록일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {snackList.map((item) => (
                                <tr key={item.snack_id}>
                                    <td>
                                        <img
                                            src={item.snack_image}
                                            alt={item.snack_name}
                                            className="admin-table-image"
                                        />
                                    </td>
                                    <td>{item.snack_name}</td>
                                    <td>{item.category_name}</td>
                                    <td>{item.snack_price}원</td>
                                    <td>{item.snack_quantity}</td>
                                    <td>{item.reg_at.split('T')[0]}</td>
                                    <td>
                                        <div className="admin-table-actions">
                                            <button
                                                className="admin-edit-btn"
                                                onClick={() => handleEdit(item.snack_id)}
                                            >
                                                <FaEdit /> 수정
                                            </button>
                                            <button
                                                className="admin-delete-btn"
                                                onClick={() => handleDelete(item.snack_id)}
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
