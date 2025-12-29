import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logAction } from '../../components/logAction';
import ActivityLog from '../../components/ActivityLog';
import './styles.css';

const AdminDash = () => {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [hasAccess, setHasAccess] = useState(true); // Track if the user has access
    const url = process.env.REACT_APP_BACKEND_URL;

    const fetchLogs = async () => {
        try {
            const response = await fetch(`${url}/api/log`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    // If 403 Forbidden, deny access
                    setHasAccess(false);
                } else {
                    throw new Error('Failed to fetch logs');
                }
            }

            const data = await response.json();
            setLogs(data.logs || []);
            fetchMessagesSummary();
        } catch (error) {
            console.error('Error fetching logs:', error);
            setHasAccess(false); // Deny access if error occurs
        }
    };

    // Fetch message summary data
    const fetchMessagesSummary = async () => {
        try {
            const response = await fetch(`${url}/api/adminMessages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    setHasAccess(false);
                } else {
                    throw new Error('Failed to fetch messages summary');
                }
            }

            const data = await response.json();
            setUnreadMessages(data.unreadMessages || 0);
            setTotalMessages(data.totalMessages || 0);
        } catch (error) {
            console.error('Error fetching messages summary:', error);
            setHasAccess(false); // Deny access if error occurs
        }
    };

    // Log actions like clicks
    const handleLogAction = async (logMessage) => {
        try {
            await logAction(logMessage);
            fetchLogs();
        } catch (error) {
            console.error('Error logging action:', error);
        }
    };

    // Filter logs based on search term
    const filteredLogs = logs.filter((log) => {
        const logDate = new Date(log.timestamp).toLocaleString();
        return (
            log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (log.username && log.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            logDate.includes(searchTerm)
        );
    });

    // Run fetch when the component mounts
    useEffect(() => {
        fetchLogs();
    }, []);

    if (!hasAccess) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Unauthorized</h2>
                <p>You do not have permission to access this page. Please contact the administrator.</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <div className="admin-sidebar">
                <h2>Admin Modules</h2>
                <ul>
                    <li>
                        <Link to="/manageUsers" onClick={() => handleLogAction('clicked into Manage Users')}>
                            Manage Users
                        </Link>
                    </li>
                    <li><Link to="/email" onClick={() => handleLogAction('clicked into Emailer')}>Send Emails</Link></li>
                    <li><Link to="#" onClick={() => handleLogAction('clicked Module 3')}>Placeholder Module 3</Link></li>
                    <li><Link to="#" onClick={() => handleLogAction('clicked Module 4')}>Placeholder Module 4</Link></li>
                </ul>
            </div>

            <div className="admin-main-content">
                <h2>Dashboard</h2>

                {/* Cards */}
                <div className="admin-card-container">
                    <div className="admin-card" onClick={() => handleLogAction('clicked into messages')}>
                        <Link to="/messages">
                            <img src="/icons/email.svg" alt="Messages" style={{ width: '50px', height: '50px' }} />
                            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Internal Messages</div>
                            <div style={{ marginTop: '5px' }}>
                                <span>Total: {totalMessages}</span> <br />
                                <span>Unread: {unreadMessages}</span>
                            </div>
                        </Link>
                    </div>
                    <div className="admin-card" onClick={() => handleLogAction('clicked Card 2')}>
                        <Link to="#">Placeholder Link 2</Link>
                    </div>
                    <div className="admin-card" onClick={() => handleLogAction('clicked Card 3')}>
                        <Link to="#">Placeholder Link 3</Link>
                    </div>
                    <div className="admin-card" onClick={() => handleLogAction('clicked Card 4')}>
                        <Link to="#">Placeholder Link 4</Link>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ margin: '20px 0', padding: '8px', width: '100%' }}
                />

                <ActivityLog logs={filteredLogs} />
            </div>
        </div>
    );
};

export default AdminDash;