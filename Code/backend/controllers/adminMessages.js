const Contact = require('../models/contact'); 

const getMessagesSummary = async (req, res) => {
  try {
    const unreadCount = await Contact.countDocuments({ responded: false });
    const totalCount = await Contact.countDocuments();

    return res.json({ totalMessages: totalCount, unreadMessages: unreadCount });

  } catch (error) {
    console.error('Error fetching messages summary:', error);
    return res.status(500).json({ error: 'Error fetching messages summary' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    console.log('Fetching all messages...');
    const messages = await Contact.find().sort({ createdAt: -1 }); 
    return res.json(messages); 
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Error fetching messages' });
  }
};


module.exports = {
  getMessagesSummary,
  getAllMessages,
};
