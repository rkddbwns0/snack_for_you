import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { ReviewApi } from '../api/review.api.tsx';
import '../css/common.css';

export const Review = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigation = useNavigate();
    const reviewApi = new ReviewApi();
    const item = location.state;
    const [content, setContent] = useState('');
    const [score, setScore] = useState([false, false, false, false, false]);
    const array = [0, 1, 2, 3, 4];

    const handleScore = (index: number) => {
        let star = [...score];
        for (let i = 0; i < star.length; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);
    };

    let clickedScore = score.filter((item) => true === item).length;

    const handleReview = async () => {
        const data = await reviewApi.insertReview({
            user_id: user?.user_id,
            snack_id: item?.snack_id,
            order_item_id: item?.order_item_id,
            content: content,
            score: clickedScore,
        });

        if (data === 201) {
            alert('리뷰가 작성되었습니다.');
            navigation('/mypage');
        }
    };

    useEffect(() => {
        console.log(item);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="page-card">
                            <h1 className="page-title">리뷰 작성</h1>
                            
                            {/* 상품 정보 섹션 */}
                            <div className="review-product-section">
                                <div className="review-product-info">
                                    <img 
                                        src={item?.image} 
                                        className="review-product-image"
                                        alt={item?.name}
                                    />
                                    <div className="review-product-details">
                                        <h3 className="review-product-name">{item?.name}</h3>
                                        <p className="review-product-quantity">구매수량: {item?.quantity}개</p>
                                    </div>
                                </div>
                            </div>

                            {/* 리뷰 작성 섹션 */}
                            <div className="review-form-section">
                                <h3 className="review-form-title">리뷰 작성</h3>
                                
                                <div className="review-form-group">
                                    <label className="review-form-label">평점</label>
                                    <div className="review-star-container">
                                        {array.map((index) => (
                                            <div key={index} className="review-star-item">
                                                {score[index] ? (
                                                    <FaStar 
                                                        size={40} 
                                                        color="#f7a815" 
                                                        onClick={() => handleScore(index)}
                                                        className="review-star"
                                                    />
                                                ) : (
                                                    <FaRegStar 
                                                        size={40} 
                                                        onClick={() => handleScore(index)}
                                                        className="review-star"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="review-score-display">
                                        평점: {clickedScore} / 5
                                    </div>
                                </div>

                                <div className="review-form-group">
                                    <label className="review-form-label">리뷰 내용</label>
                                    <textarea
                                        className="review-textarea"
                                        rows={6}
                                        placeholder="리뷰를 작성해 주세요. 상품에 대한 솔직한 후기를 남겨주세요."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div className="review-form-actions">
                                    <button 
                                        className="review-submit-btn"
                                        onClick={handleReview}
                                        disabled={clickedScore === 0 || content.trim() === ''}
                                    >
                                        리뷰 작성하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
