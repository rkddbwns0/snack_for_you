import React, { useEffect, useState } from 'react';
import { AdminApi } from '../../api/admin.api.tsx';
import '../../css/admin_product_register.css';

interface ProductFormData {
    name: string;
    price: number | null;
    quantity: number | null;
    category_id: number | null;
    product_image: File | null;
    brand: string;
    composition: string | null;
    weight: string;
    product_form: string;
    nation_info: string;
}

export const AdminProductRegister = () => {
    const adminApi = new AdminApi();
    const [category, setCategory] = useState<[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        price: 0,
        quantity: 0,
        category_id: null,
        product_image: null,
        brand: '',
        composition: null,
        weight: '',
        product_form: '',
        nation_info: '',
    });

    const snackCategory = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/category`, {
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setCategory(data.category);
        } catch (e) {
            console.error(e);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            setFormData({ ...formData, product_image: file });
        }
    };

    const createSnack = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.product_image) {
            alert('이미지를 선택해주세요');
            return;
        }
        const data = await adminApi.createSnack(formData);
        if (data?.status === 200) {
            alert(data?.data.message);
            setFormData({
                name: '',
                price: null,
                quantity: null,
                category_id: null,
                product_image: null,
                brand: '',
                composition: '',
                weight: '',
                product_form: '',
                nation_info: '',
            });
            window.location.reload();
        } else {
            alert(data?.data.message);
        }
    };

    useEffect(() => {
        snackCategory();
    }, []);

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>제품 등록</h1>
                <p>새로운 제품을 등록하세요</p>
            </div>

            <div className="admin-register-form-container">
                <div className="admin-register-form">
                    {/* 기본 정보 섹션 */}
                    <div className="admin-register-section">
                        <h3 className="admin-register-section-title">기본 정보</h3>
                        <div className="admin-register-form-grid">
                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">상품명 *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="상품명을 입력하세요"
                                    className="admin-register-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">가격 (원) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price || ''}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                    placeholder="0"
                                    className="admin-register-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">재고 *</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity || ''}
                                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                                    placeholder="0"
                                    className="admin-register-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">카테고리 *</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category_id: e.target.value ? parseInt(e.target.value) : null,
                                        })
                                    }
                                    className="admin-register-form-input"
                                    required
                                >
                                    <option value="">카테고리 선택</option>
                                    {category.map((item: any) => (
                                        <option key={item.category_id} value={item.category_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 이미지 및 브랜드 섹션 */}
                    <div className="admin-register-section">
                        <h3 className="admin-register-section-title">상품 이미지 & 브랜드</h3>
                        <div className="admin-register-form-grid">
                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">이미지 URL *</label>
                                <input
                                    type="file"
                                    name="product_image"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleImageChange}
                                    placeholder="이미지 URL을 입력하세요"
                                    className="admin-register-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-register-form-group">
                                <label className="admin-register-form-label">브랜드</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    placeholder="브랜드명을 입력하세요"
                                    className="admin-register-form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 상세 정보 섹션 */}
                    <div className="admin-register-section">
                        <h3 className="admin-register-section-title">상세 정보</h3>
                        <div className="admin-register-form-group">
                            <label className="admin-register-form-label">상품 형태</label>
                            <input
                                type="text"
                                name="product_form"
                                value={formData.product_form}
                                onChange={(e) => setFormData({ ...formData, product_form: e.target.value })}
                                placeholder="예: 액상, 가루, 정제 등"
                                className="admin-register-form-input"
                            />
                        </div>

                        <div className="admin-register-form-group">
                            <label className="admin-register-form-label">무게</label>
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="예: 100g, 200ml"
                                className="admin-register-form-input"
                            />
                        </div>

                        <div className="admin-register-form-group">
                            <label className="admin-register-form-label">원산지</label>
                            <input
                                type="text"
                                name="nation_info"
                                value={formData.nation_info}
                                onChange={(e) => setFormData({ ...formData, nation_info: e.target.value })}
                                placeholder="예: 대한민국"
                                className="admin-register-form-input"
                            />
                        </div>

                        <div className="admin-register-form-group">
                            <label className="admin-register-form-label">구성/원료</label>
                            <textarea
                                name="composition"
                                value={formData.composition || ''}
                                onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                                placeholder="상품의 구성과 원료 정보를 입력하세요"
                                className="admin-register-form-textarea"
                                rows={5}
                            />
                        </div>
                    </div>

                    {/* 버튼 섹션 */}
                    <div className="admin-register-form-actions">
                        <button type="button" className="admin-register-submit-btn" onClick={createSnack}>
                            제품 등록
                        </button>
                        <button
                            type="button"
                            className="admin-register-cancel-btn"
                            onClick={() =>
                                setFormData({
                                    name: '',
                                    price: 0,
                                    quantity: 0,
                                    category_id: null,
                                    product_image: '',
                                    brand: '',
                                    composition: '',
                                    weight: '',
                                    nation_info: '',
                                })
                            }
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
