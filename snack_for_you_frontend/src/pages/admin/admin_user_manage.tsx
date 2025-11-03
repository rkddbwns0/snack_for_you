import { useState, useEffect } from 'react';
import { FaTrash, FaInfoCircle } from 'react-icons/fa';
import { AdminApi } from '../../api/admin.api.tsx';
interface User {
    user_id: number;
    email: string;
    user_name: string;
    nickname: string;
    created_at: string;
    total_orders: number;
}

export const AdminUserManage = () => {
    const adminApi = new AdminApi();
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getAllUserList = async () => {
        const data = await adminApi.getAllUserList();
        setUsers(data);
    };
    useEffect(() => {
        getAllUserList();
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
                {users ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>닉네임</th>
                                <th>가입일</th>
                                <th>주문 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.user_id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <span className="admin-order-count">{user.order_count}건</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-message">
                        <p>사용자가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
