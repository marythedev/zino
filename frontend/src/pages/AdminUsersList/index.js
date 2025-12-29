import { useEffect, useState } from 'react';
import { logAction } from '../../components/logAction';
import './styles.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(20);
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${url}/api/admin/listUsers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 403) {
                    setUnauthorized(true);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleStatus = async (username) => {
        const confirmAction = window.confirm(`Are you sure you want to toggle the status for ${username}?`);

        if (confirmAction) {
            try {
                const response = await fetch(`${url}/api/admin/toggleUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ username })
                });

                if (!response.ok) {
                    throw new Error('Failed to update user status');
                }

                const updatedUser = await response.json();
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.username === updatedUser.user.username ? updatedUser.user : user
                    )
                );

                const newStatus = updatedUser.user.account_enabled ? 'Enabled' : 'Disabled';
                await logAction(`${newStatus} user account: "${username}"`);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (unauthorized) return <div className="unauthorized-message">Access Denied</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container1">
            <h1 className="headerUser">User List</h1>

            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="cell header-cell">Username</div>
                    <div className="cell header-cell">Email</div>
                    <div className="cell header-cell">Account Type</div>
                    <div className="cell header-cell">Account Status</div>
                    <div className="cell header-cell">Actions</div>
                </div>
                {currentUsers.map(user => (
                    <div className="table-row" key={user.username}>
                        <div className="cell">{user.username}</div>
                        <div className="cell">{user.email}</div>
                        <div className="cell">{user.account_type}</div>
                        <div className="cell">{user.account_enabled ? 'Enabled' : 'Disabled'}</div>
                        <div className="cell">
                            <button onClick={() => toggleStatus(user.username)}>Toggle Status</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="results-per-page-container">
                <label>Results Per Page:</label>
                <input
                    type="number"
                    value={usersPerPage}
                    onChange={(e) => setUsersPerPage(Number(e.target.value))}
                    min="1"
                    max="100"
                />
            </div>

            <div className="pagination-container">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default AdminPage;