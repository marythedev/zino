const Log = require('../models/Log');

const adminLog = {

    get: async (_req, res) => {
        try {
            const logs = await Log.find()
                .populate({
                    path: 'admin',
                    select: 'username',
                })
                .select('message timestamp')
                .exec();

            const formattedLogs = logs.map(log => ({
                username: log.admin ? log.admin.username : 'Unknown',
                message: log.message,
                timestamp: log.timestamp,
            }));

            res.status(200).json({ success: true, logs: formattedLogs });
        } catch (error) {
            console.error('Error fetching logs:', error);
            res.status(500).json({ success: false, error: 'Error fetching logs' });
        }
    },

    post: async (req, res) => {
        const { message } = req.body;
        const user = req.user;

        if (!message || !user || !user.userId) {
            return res.status(400).json({ success: false, error: 'Message and User ID are required' });
        }

        try {
            const logEntry = new Log({
                message,
                admin: user.userId,
            });
            await logEntry.save();

            res.status(201).json({ success: true, log: logEntry });
        } catch (error) {
            console.error('Error saving log:', error);
            res.status(500).json({ success: false, error: 'Error saving log' });
        }
    },
};

module.exports = adminLog;