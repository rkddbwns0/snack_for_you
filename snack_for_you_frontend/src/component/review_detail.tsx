import { FaTimes } from 'react-icons/fa';
import '../css/review_detail.css';

interface ReviewData {
    review_id: number;
    snack_image: string;
    snack_name: string;
    order_quantity: number;
    user_name: string;
    user_nickname: string;
    review_content: string;
    review_writed_at: string;
    review_score: number;
}

export const ReviewDetail = ({
    isOpen,
    setIsOpen,
    review,
}: {
    isOpen: boolean;
    setIsOpen: () => void;
    review?: ReviewData;
}) => {
    if (!isOpen || !review) return null;

    return (
        <div className="review-detail-overlay" onClick={setIsOpen}>
            <div className="review-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="review-detail-header">
                    <h2>리뷰 상세보기</h2>
                    <button className="review-detail-close-btn" onClick={setIsOpen}>
                        <FaTimes />
                    </button>
                </div>

                <div className="review-detail-body">
                    {/* 상품 정보 섹션 */}
                    <div className="review-detail-section">
                        <h3>상품 정보</h3>
                        <div className="review-product-info">
                            <img src={review.snack_image} alt={review.snack_name} className="review-product-image" />
                            <div className="review-product-details">
                                <p className="review-product-name">{review.snack_name}</p>
                                <p className="review-product-quantity">구매수량: {review.order_quantity}개</p>
                            </div>
                        </div>
                    </div>

                    {/* 작성자 정보 섹션 */}
                    <div className="review-detail-section">
                        <h3>작성자 정보</h3>
                        <div className="review-author-info">
                            <div className="review-author-item">
                                <label>이름</label>
                                <p>{review.user_name}</p>
                            </div>
                            <div className="review-author-item">
                                <label>닉네임</label>
                                <p>{review.user_nickname}</p>
                            </div>
                            <div className="review-author-item">
                                <label>작성일</label>
                                <p>{review.review_writed_at}</p>
                            </div>
                        </div>
                    </div>

                    {/* 평점 섹션 */}
                    <div className="review-detail-section">
                        <h3>평점</h3>
                        <div className="review-score-display">
                            <span className="review-stars">{'⭐'.repeat(review.review_score)}</span>
                            <span className="review-score-text">{review.review_score}점</span>
                        </div>
                    </div>

                    {/* 리뷰 내용 섹션 */}
                    <div className="review-detail-section">
                        <h3>리뷰 내용</h3>
                        <p className="review-content-text">{review.review_content}</p>
                    </div>
                </div>

                <div className="review-detail-footer">
                    <button className="review-close-button" onClick={setIsOpen}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};
