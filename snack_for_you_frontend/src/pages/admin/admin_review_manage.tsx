import { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

interface Review {
    review_id: number;
    snack_name: string;
    user_nickname: string;
    review_score: number;
    review_content: string;
    review_writed_at: string;
}

export const AdminReviewManage = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: API에서 리뷰 목록 조회
        setReviews([]);
        setLoading(false);
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
            // TODO: API로 리뷰 삭제
            console.log('리뷰 삭제:', id);
        }
    };

    const handleView = (review: Review) => {
        // TODO: 리뷰 상세 보기
        console.log('리뷰 상세:', review);
    };

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>리뷰 관리</h1>
                <p>사용자 리뷰를 관리하세요</p>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-empty-message">
                        <p>로딩 중...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>상품명</th>
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
                                    <td>{review.snack_name}</td>
                                    <td>{review.user_nickname}</td>
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
                                            <button
                                                className="admin-view-btn"
                                                onClick={() => handleView(review)}
                                            >
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
