// Admin Dashboard for list users
import './AdminUsersList.css';
import React, { useEffect, useState } from 'react';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(20);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://group-13-jtix.vercel.app/api/admin/listUsers', {
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
                const response = await fetch(`https://group-13-jtix.vercel.app/api/admin/toggleUser`, {
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
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Page nav stuff
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (unauthorized) {
        return (
            <div className="unauthorized-message">
                <h2>Access Denied</h2>
                <p>You are not authorized to access this module.</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="headerUser">User List</h1>

            <div className="search-bar-container">
                <input
                    id="search"
                    type="text"
                    placeholder="Search by username or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>Account Status</th>
                            <th>Status Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.account_type}</td>
                                <td>{user.account_enabled ? 'Enabled' : 'Disabled'}</td>
                                <td><button onClick={() => toggleStatus(user.username)}>Toggle Status</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="results-per-page-container">
                <label htmlFor="resultsPerPage">Results Per Page:</label>
                <input
                    id="resultsPerPage"
                    type="number"
                    value={usersPerPage}
                    onChange={(e) => setUsersPerPage(Number(e.target.value))}
                    min="1"
                    max="100"
                />
            </div>

            <div className="pagination-container">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
