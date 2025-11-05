import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AdminApi } from '../../api/admin.api.tsx';
import { EditProductModal } from '../../component/edit_product_modal.tsx';

export const AdminProductManage = () => {
    const [snackList, setSnackList] = useState<any>([]);
    const adminApi = new AdminApi();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleOpenModal = (product: any) => {
        console.log(product);
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsOpen(false);
    };

    const getAllSnackList = async () => {
        const data = await adminApi.getAllSnackList();
        setSnackList(data);
    };

    useEffect(() => {
        getAllSnackList();
    }, []);

    const handleDelete = async (snack_id: number) => {
        if (window.confirm('이 제품을 삭제하시겠습니까?')) {
            const data = await adminApi.deleteSnack(snack_id);
            if (data?.status === 200) {
                alert(data?.data.message);
                getAllSnackList();
            } else {
                alert(data?.data.message);
            }
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
                            {snackList.map((item: any) => (
                                <tr key={item.snack_id}>
                                    <td>
                                        <img
                                            src={
                                                item.snack_image && item.snack_image.startsWith('http')
                                                    ? item.snack_image
                                                    : `${process.env.REACT_APP_SERVER_URL}/${item.snack_image}`
                                            }
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
                                            <button className="admin-edit-btn" onClick={() => handleOpenModal(item)}>
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
            <EditProductModal
                isOpen={isOpen}
                setIsOpen={handleCloseModal}
                productData={selectedProduct}
                onUpdateSuccess={getAllSnackList}
            />
        </div>
    );
};
