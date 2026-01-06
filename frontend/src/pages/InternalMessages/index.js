import { useState, useEffect, useCallback } from 'react';
import { logAction } from '../../components/logAction';
import './styles.css';

const InternalMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedMessageIds, setExpandedMessageIds] = useState(new Set());
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage, setMessagesPerPage] = useState(10);
    const [customMessagesPerPage, setCustomMessagesPerPage] = useState(10);
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [isAdmin, setIsAdmin] = useState(true);
    const [replies, setReplies] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const url = process.env.REACT_APP_BACKEND_URL

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(`${url}/api/adminAllMessages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 403) {
                setIsAdmin(false);
            }
            else if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);


    const handleSaveNote = () => {

        setIsSaved(true);

        setTimeout(() => {
            setIsSaved(false);
        }, 1200);
    };


    const handleReplyChange = (messageId, e) => {
        const { value } = e.target;
        setReplies((prevReplies) => ({
            ...prevReplies,
            [messageId]: value,
        }));
    };

    const toggleMessage = (id) => {
        setExpandedMessageIds((prevExpanded) => {
            const updatedExpanded = new Set();
            if (!prevExpanded.has(id)) {
                updatedExpanded.add(id);
            }
            return updatedExpanded;
        });
    };

    const handleCheckboxChange = (id, e) => {
        e.stopPropagation();

        setSelectedMessages((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(id)) {
                updatedSelected.delete(id);
            } else {
                updatedSelected.add(id);
            }
            return updatedSelected;
        });
    };

    const deleteMessages = async () => {
        if (selectedMessages.size === 0) {
            alert('Please select at least one message to delete');
            return;
        }

        const isConfirmed = window.confirm('Are you sure you want to delete the selected messages?');

        if (!isConfirmed) {
            return;
        }

        try {
            const messageIds = [...selectedMessages];

            const response = await fetch(`${url}/api/adminDeleteMessages`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ messageIds }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete messages');
            }

            const data = await response.json();
            alert(`${data.message}`);


            setMessages((prevMessages) => prevMessages.filter((message) => !messageIds.includes(message._id)));

            setSelectedMessages(new Set());
            logAction(`Messages with IDs ${messageIds.join(', ')} were deleted.`);
        } catch (error) {
            console.error('Error deleting messages:', error);
        }
    };


    const deleteMessage = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this message?');

        if (!isConfirmed) return;

        try {
            const response = await fetch(`${url}/api/adminDeleteMessage/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            logAction(`Message with ID ${id} was deleted.`);
            setMessages((prevMessages) => prevMessages.filter((message) => message._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const addNoteMessage = async (id, responseText) => {
        let message = responseText[id];
        handleSaveNote();

        try {
            const response = await fetch(`${url}/adminAddResponse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,

                },
                body: JSON.stringify({ id, message }),
            });

            if (!response.ok) {
            }
            logAction(`Message with ID ${id} had note added.`);

        } catch (error) {
            setError(error.message);
        }
    };

    const markAsResponded = async () => {
        if (selectedMessages.size === 0) {
            alert('Please select at least one message to mark as responded');
            return;
        }

        try {
            const messageIds = [...selectedMessages];
            const respondedStatus = true;


            const response = await fetch(`${url}/api/adminMarkMessagesAsResponded`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ messageIds, respondedStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update messages');
            }

            const data = await response.json();


            const updatedMessages = data.updatedMessages;


            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    updatedMessages.includes(message._id)
                        ? { ...message, responded: true }
                        : message
                )
            );

            logAction(`Messages with IDs ${messageIds.join(', ')} were marked as responded.`);
            setSelectedMessages(new Set());
        } catch (error) {
            setError(error.message);
        }
    };

    const markAsNotResponded = async () => {
        if (selectedMessages.size === 0) {
            alert('Please select at least one message to mark as responded');
            return;
        }

        try {
            const messageIds = [...selectedMessages];
            const respondedStatus = false;


            const response = await fetch(`${url}/api/adminMarkMessagesAsResponded`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ messageIds, respondedStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update messages');
            }

            const data = await response.json();


            const updatedMessages = data.updatedMessages;

            logAction(`Messages with IDs ${messageIds.join(', ')} were marked as not responded.`);
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    updatedMessages.includes(message._id)
                        ? { ...message, responded: false }
                        : message
                )
            );


            setSelectedMessages(new Set());
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredMessages = messages.filter((message) => {

        if (filter === 'unread') return !message.responded;
        if (filter === 'read') return message.responded;
        return true;
    }).filter((message) => {

        const searchTermLower = searchTerm.toLowerCase();
        const isMatchByUsername = message.name.toLowerCase().includes(searchTermLower);
        const isMatchByDate = message.createdAt && message.createdAt.includes(searchTerm);
        const isMatchByEmail = message.email && message.email.includes(searchTerm);

        return isMatchByUsername || isMatchByDate || isMatchByEmail;
    });


    const totalMessages = filteredMessages.length;
    const totalPages = Math.ceil(totalMessages / messagesPerPage);

    const currentMessages = filteredMessages.slice(
        (currentPage - 1) * messagesPerPage,
        currentPage * messagesPerPage
    );

    const allCount = messages.length;
    const unreadCount = messages.filter((message) => !message.responded).length;
    const readCount = messages.filter((message) => message.responded).length;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleMessagesPerPageChange = (e) => {
        const newMessagesPerPage = parseInt(e.target.value, 10);
        setMessagesPerPage(newMessagesPerPage);
        setCustomMessagesPerPage(newMessagesPerPage);
        setCurrentPage(1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return (
            <div className="unauthorized-wrapper">
                <div className='unauthorized'>
                    <h2>Unauthorized</h2>
                <p>You do not have permission to access this page. Please contact your administrator.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="messages-container">
                <div className="sidebar">
                    <h3>Category</h3>
                    <ul>
                        <li className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                            All Messages ({allCount})
                        </li>
                        <li className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>
                            Unread Messages ({unreadCount})
                        </li>
                        <li className={filter === 'read' ? 'active' : ''} onClick={() => setFilter('read')}>
                            Read Messages ({readCount})
                        </li>
                    </ul>
                </div>

                <div className="messages-list1">
                    <div>
                        <h2>Internal Messages</h2>

                        <input
                            type="text"
                            placeholder="Search by email, username, or date..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-bar"
                        />


                        <div className="actions-container">
                            <button className='action-buttons' onClick={markAsResponded}>Mark as <span role="img" aria-label="checkmark">
                                ✅
                            </span></button>
                            <button className='action-buttons' onClick={markAsNotResponded}>Mark as <span role="img" aria-label="crossmark">
                                ❌
                            </span></button>
                            <button className='action-buttons' onClick={deleteMessages}>Delete Selected <span role="img" aria-label="checkmark">
                                🗑️
                            </span></button>
                        </div>
                    </div>
                    {currentMessages.length === 0 ? (
                        <p>No messages to display</p>
                    ) : (
                        <ul>
                            {currentMessages.map((message) => (
                                <li key={message._id} className="message-item1">
                                    <div
                                        className="message-header"
                                        onClick={() => toggleMessage(message._id)}
                                    >
                                        <div>
                                            <strong>From:</strong> {message.email}
                                        </div>
                                        <div>
                                            <strong>User:</strong> {message.name}
                                        </div>
                                        <div>
                                            <strong>Handled:</strong>
                                            {message.responded ? (
                                                <span role="img" aria-label="checkmark" className='checkboxcustom'>
                                                    ✅
                                                </span>
                                            ) : (
                                                <span role="img" aria-label="crossmark" className='checkboxcustom'>
                                                    ❌
                                                </span>
                                            )}
                                        </div>
                                        <span className="date-section">
                                            <b>Date: </b>{new Date(message.createdAt).toLocaleString()}
                                        </span>
                                        <input className='otherCheckbox'
                                            type="checkbox"
                                            checked={selectedMessages.has(message._id)}
                                            onClick={(e) => handleCheckboxChange(message._id, e)}
                                        />
                                        <button onClick={(e) => { e.stopPropagation(); deleteMessage(message._id); }}>
                                            🗑️
                                        </button>
                                    </div>
                                    {expandedMessageIds.has(message._id) && (
                                        <div className="message-body">
                                            <strong>Contents:</strong>
                                            <p className="message-content-paragraph">{message.message}</p>

                                            <div className="message-note">
                                                <p><u>Admin Notes:</u></p>
                                                <textarea
                                                    className="message-reply-input"
                                                    value={replies[message._id] || (message.response ? message.response : '')}
                                                    onChange={(e) => handleReplyChange(message._id, e)}
                                                    placeholder="Write a reply..."
                                                />
                                                <button onClick={(e) => { addNoteMessage(message._id, replies); }}>
                                                    Save Note
                                                </button>
                                                &nbsp;&nbsp;
                                                <text className="hidden-attr" hidden={!isSaved}>&nbsp;&nbsp;Saved!</text>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="pagination-container">
                <div className="messages-per-page">
                    <label htmlFor="messagesPerPage">Messages per page: </label>
                    <input
                        type="number"
                        id="messagesPerPage"
                        value={customMessagesPerPage}
                        onChange={handleMessagesPerPageChange}
                        min="1"
                        max="100"
                    />
                </div>

                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span>{currentPage}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InternalMessages;