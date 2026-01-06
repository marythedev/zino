const Contact = require('../models/Contact');

const getMessagesSummary = async (_req, res) => {
    try {
        const unreadCount = await Contact.countDocuments({ responded: false });
        const totalCount = await Contact.countDocuments();

        return res.json({ totalMessages: totalCount, unreadMessages: unreadCount });

    } catch (error) {
        console.error('Error fetching messages summary:', error);
        return res.status(500).json({ error: 'Error fetching messages summary' });
    }
};

const getAllMessages = async (_req, res) => {
    try {
        console.log('Fetching all messages...');
        const messages = await Contact.find().sort({ createdAt: -1 });
        return res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Error fetching messages' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Contact.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        return res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ error: 'Error deleting message' });
    }
};

const markMessagesAsResponded = async (req, res) => {
    try {
        const { messageIds, respondedStatus } = req.body;

        if (!Array.isArray(messageIds) || messageIds.length === 0) {
            return res.status(400).json({ error: 'No message IDs provided' });
        }

        await Contact.updateMany(
            { _id: { $in: messageIds } },
            { $set: { responded: respondedStatus } }
        );

        const updatedMessageIds = messageIds;

        return res.json({ updatedMessages: updatedMessageIds });
    } catch (error) {
        console.error('Error updating messages:', error);
        return res.status(500).json({ error: 'Error updating messages' });
    }
};

const deleteMessages = async (req, res) => {
    try {
        const { messageIds } = req.body;

        if (!Array.isArray(messageIds) || messageIds.length === 0) {
            return res.status(400).json({ error: 'No message IDs provided' });
        }

        const deletedMessages = await Contact.deleteMany({ _id: { $in: messageIds } });

        if (deletedMessages.deletedCount === 0) {
            return res.status(404).json({ error: 'No messages found to delete' });
        }

        return res.json({ message: `${deletedMessages.deletedCount} messages deleted successfully` });
    } catch (error) {
        console.error('Error deleting messages:', error);
        return res.status(500).json({ error: 'Error deleting messages' });
    }
};

const addResponse = async (req, res) => {
    try {
        const { id, message } = req.body;

        if (!id || !message) {
            return res.status(400).json({ error: 'Message ID and response are required' });
        }

        const updatedMessage = await Contact.findByIdAndUpdate(
            id,
            {
                $set: {
                    response: message,
                }
            },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        return res.json({
            message: 'Response added successfully',
            updatedMessage: updatedMessage
        });
    } catch (error) {
        console.error('Error adding response:', error);
        return res.status(500).json({ error: 'Error adding response to message' });
    }
};

module.exports = {
    getMessagesSummary,
    getAllMessages,
    deleteMessage,
    markMessagesAsResponded,
    deleteMessages,
    addResponse,
};