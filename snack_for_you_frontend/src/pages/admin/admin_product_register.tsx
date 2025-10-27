import { useState } from 'react';

export const AdminProductRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        stock: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API로 제품 등록
        console.log('제품 등록:', formData);
    };

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>제품 등록</h1>
                <p>새로운 제품을 등록하세요</p>
            </div>

            <div className="admin-form-container">
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label>제품명 *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="제품명을 입력하세요"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>설명 *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="제품 설명을 입력하세요"
                            rows={5}
                            required
                        />
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>가격 (원) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>재고 *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>카테고리 *</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">카테고리 선택</option>
                                <option value="1">초콜릿</option>
                                <option value="2">캔디</option>
                                <option value="3">쿠키</option>
                                <option value="4">스낵</option>
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label>이미지 URL *</label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                placeholder="이미지 URL을 입력하세요"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-actions">
                        <button type="submit" className="admin-submit-btn">
                            등록하기
                        </button>
                        <button type="reset" className="admin-cancel-btn">
                            초기화
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
