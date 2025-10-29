import { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import { AdminApi } from '../../api/admin.api.tsx';

export const AdminReviewManage = () => {
    const adminApi = new AdminApi();
    const [reviews, setReviews] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getAllReviewList = async () => {
        const data = await adminApi.getAllReviewList();
        console.log(data);
        setReviews(data);
    };

    useEffect(() => {
        getAllReviewList();
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
            console.log('리뷰 삭제:', id);
        }
    };

    const handleView = (review: Review) => {
        // TODO: 리뷰 상세 보기
        console.log('리뷰 상세:', review);
    };

    return (
        <div className="admin-content-wrapper admin-review-manage">
            <div className="admin-content-header">
                <h1>리뷰 관리</h1>
                <p>사용자 리뷰를 관리하세요</p>
            </div>

            <div className="admin-table-container">
                {reviews ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>상품</th>
                                <th>작성자</th>
                                <th>평점</th>
                                <th>내용</th>
                                <th>작성일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.review_id}>
                                    <td>
                                        <img
                                            src={review.snack_image}
                                            alt={review.snack_name}
                                            className="admin-table-image"
                                        />
                                        <div className="admin-product-info">
                                            <span className="admin-product-name">{review.snack_name}</span>
                                            <span className="admin-product-quantity">({review.order_quantity}개)</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="admin-user-info">{review.user_name}</span>
                                        <span className="admin-user-nickname">({review.user_nickname})</span>
                                    </td>
                                    <td>
                                        <span className="admin-review-score">
                                            {'⭐'.repeat(review.review_score)} {review.review_score}점
                                        </span>
                                    </td>
                                    <td className="admin-review-content">
                                        {review.review_content.substring(0, 50)}...
                                    </td>
                                    <td>{review.review_writed_at}</td>
                                    <td>
                                        <div className="admin-table-actions">
                                            <button className="admin-view-btn" onClick={() => handleView(review)}>
                                                <FaEye /> 보기
                                            </button>
                                            <button
                                                className="admin-delete-btn"
                                                onClick={() => handleDelete(review.review_id)}
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
                        <p>리뷰가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
