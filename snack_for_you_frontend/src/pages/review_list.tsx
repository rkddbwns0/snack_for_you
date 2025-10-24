import { useEffect, useState } from "react";
import { ReviewApi } from "../api/review.api.tsx";
import { useAuth } from "../context/context.tsx";
import '../css/common.css';
import { useNavigate } from "react-router-dom";

export const ReviewList = () => {
    const {user} = useAuth();
    const navigation = useNavigate();
    const reviewApi = new ReviewApi();
    const [reviewList, setReviewList] = useState<any[]>([]);

    const getReviewList = async () => {
        try {
            const data = await reviewApi.userReview(user?.user_id);
            console.log(data)
            setReviewList(data);
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getReviewList();
    }, [])

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="page-card">
                            <h1 className="page-title">리뷰 내역</h1>
                            
                            {reviewList && reviewList.length > 0 ? (
                                <div className="review-list-container">
                                    {reviewList.map((item: any) => (
                                        <div key={item.review_id} 
                                        className="review-list-item" 
                                        onClick={() => navigation(`/snack_detail/${item.snack_id}`, {state: {category_id: item.category_id}})}
                                        >
                                            <img 
                                                src={item.snack_image} 
                                                alt={item.product_name}
                                                className="review-list-image"
                                            />
                                            <div className="review-list-info">
                                                <h5 className="review-list-product-name">{item.snack_name} ({item.order_quantity}개)</h5>
                                                <div className="review-list-meta">
                                                    <span className="review-list-score">
                                                        평점: {item.review_score}점
                                                    </span>
                                                    <span className="review-list-date">
                                                        작성일: {item.review_writed_at}
                                                    </span>
                                                </div>
                                                <div className="review-list-content">
                                                    {item.review_content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="snack-empty-message">
                                    <h3>리뷰 내역이 없습니다.</h3>
                                    <p>작성한 리뷰가 없습니다. 상품 리뷰를 작성해보세요!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}