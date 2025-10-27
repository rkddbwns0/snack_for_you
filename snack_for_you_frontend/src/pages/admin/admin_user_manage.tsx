import { useState, useEffect } from 'react';
import { FaTrash, FaInfoCircle } from 'react-icons/fa';

interface User {
    user_id: number;
    email: string;
    user_name: string;
    nickname: string;
    created_at: string;
    total_orders: number;
}

export const AdminUserManage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: API에서 사용자 목록 조회
        setUsers([]);
        setLoading(false);
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('이 사용자를 삭제하시겠습니까?\n모든 관련 데이터가 삭제됩니다.')) {
            // TODO: API로 사용자 삭제
            console.log('사용자 삭제:', id);
        }
    };

    const handleView = (user: User) => {
        // TODO: 사용자 상세 정보
        console.log('사용자 상세:', user);
    };

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>사용자 관리</h1>
                <p>사용자 계정을 관리하세요</p>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-empty-message">
                        <p>로딩 중...</p>
                    </div>
                ) : users.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>이메일</th>
                                <th>이름</th>
                                <th>닉네임</th>
                                <th>가입일</th>
                                <th>주문 수</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.user_id}>
                                    <td>{user.email}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <span className="admin-order-count">
                                            {user.total_orders}건
                                        </span>
                                    </td>
                                    <td>
                                        <div className="admin-table-actions">
                                            <button
                                                className="admin-info-btn"
                                                onClick={() => handleView(user)}
                                            >
                                                <FaInfoCircle /> 정보
                                            </button>
                                            <button
                                                className="admin-delete-btn"
                                                onClick={() => handleDelete(user.user_id)}
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
                        <p>등록된 사용자가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
