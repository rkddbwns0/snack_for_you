import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AdminApi } from '../api/admin.api.tsx';
import '../css/edit_product_modal.css';

interface productData {
    snack_id: number;
    snack_brand: string;
    snack_composition: string;
    snack_weight: string;
    snack_nation_info: string;
    snack_name: string;
    snack_image: string;
    snack_price: number;
    snack_quantity: number;
    category_name: string;
}

export const EditProductModal = ({
    isOpen,
    setIsOpen,
    productData,
    onUpdateSuccess,
}: {
    isOpen: boolean;
    setIsOpen: () => void;
    productData: productData;
    onUpdateSuccess?: () => void;
}) => {
    const adminApi = new AdminApi();
    const [formData, setFormData] = useState<any>({
        name: productData?.snack_name || '',
        price: productData?.snack_price || 0,
        quantity: productData?.snack_quantity || 0,
        category_name: productData?.category_name || '',
        product_image: productData?.snack_image || '',
        brand: productData?.snack_brand || '',
        composition: productData?.snack_composition || '',
        weight: productData?.snack_weight || '',
        nation_info: productData?.snack_nation_info || '',
    });

    const handleUpdateProduct = async () => {
        const data = await adminApi.updateSnack(productData.snack_id, formData);
        if (data?.status === 200) {
            alert(data?.data.message);
            setIsOpen();
            onUpdateSuccess?.(); // 수정 완료 후 콜백 호출
        } else {
            alert(data?.data.message);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    useEffect(() => {
        setFormData({
            name: productData?.snack_name,
            price: productData?.snack_price,
            quantity: productData?.snack_quantity,
            product_image: productData?.snack_image,
            brand: productData?.snack_brand,
            composition: productData?.snack_composition,
            weight: productData?.snack_weight,
            nation_info: productData?.snack_nation_info,
        });
    }, [productData]);

    if (!isOpen || !productData) return null;

    return (
        <div className="edit-product-overlay" onClick={setIsOpen}>
            <div className="edit-product-modal" onClick={(e) => e.stopPropagation()}>
                <div className="edit-product-header">
                    <h2>상품 정보 수정</h2>
                    <button className="edit-product-close-btn" onClick={setIsOpen}>
                        <FaTimes />
                    </button>
                </div>

                <div className="edit-product-body">
                    {/* 상품 이미지 섹션 */}
                    <div className="edit-product-section">
                        <h3>상품 이미지</h3>
                        <img
                            src={
                                productData.snack_image && productData.snack_image.startsWith('http')
                                    ? productData.snack_image
                                    : `${process.env.REACT_APP_SERVER_URL}/${productData.snack_image}`
                            }
                            alt={productData.snack_name}
                            className="edit-product-image"
                            onError={(e) => {
                                console.error(
                                    '이미지 로드 실패:',
                                    `${process.env.REACT_APP_SERVER_URL}/${productData.snack_image}`
                                );
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <input
                            type="text"
                            placeholder="이미지 URL"
                            value={formData.product_image}
                            onChange={(e) => handleInputChange('product_image', e.target.value)}
                            className="edit-product-input"
                        />
                    </div>

                    {/* 기본 정보 섹션 */}
                    <div className="edit-product-section">
                        <h3>기본 정보</h3>
                        <div className="edit-product-form-grid">
                            <div className="edit-product-form-group">
                                <label>상품명</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="edit-product-input"
                                />
                            </div>
                            <div className="edit-product-form-group">
                                <label>가격</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                                    className="edit-product-input"
                                />
                            </div>
                            <div className="edit-product-form-group">
                                <label>수량</label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                                    className="edit-product-input"
                                />
                            </div>
                            <div className="edit-product-form-group">
                                <label>카테고리</label>
                                <input
                                    type="text"
                                    value={productData?.category_name}
                                    className="edit-product-input"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* 상세 정보 섹션 */}
                    <div className="edit-product-section">
                        <h3>상세 정보</h3>
                        <div className="edit-product-form-grid">
                            <div className="edit-product-form-group">
                                <label>브랜드</label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                    className="edit-product-input"
                                />
                            </div>
                            <div className="edit-product-form-group">
                                <label>무게</label>
                                <input
                                    type="text"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    className="edit-product-input"
                                />
                            </div>
                            <div className="edit-product-form-group">
                                <label>원산지</label>
                                <input
                                    type="text"
                                    value={formData.nation_info}
                                    onChange={(e) => handleInputChange('nation_info', e.target.value)}
                                    className="edit-product-input"
                                />
                            </div>
                        </div>
                        <div className="edit-product-form-group" style={{ marginTop: '15px' }}>
                            <label>구성/원료</label>
                            <textarea
                                value={formData.composition}
                                onChange={(e) => handleInputChange('composition', e.target.value)}
                                className="edit-product-textarea"
                                placeholder="상품 구성과 원료 정보를 입력하세요"
                            />
                        </div>
                    </div>
                </div>

                <div className="edit-product-footer">
                    <button className="edit-product-cancel-button" onClick={setIsOpen}>
                        취소
                    </button>
                    <button className="edit-product-submit-button" onClick={handleUpdateProduct}>
                        수정 완료
                    </button>
                </div>
            </div>
        </div>
    );
};
