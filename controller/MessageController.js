const { Message } = require("../model/Message");

exports.sendMessage = async (req, res) => {
    try {
        const { id1, id2, senderId, content } = req.body;

        if (!id1 || !id2 || !senderId || !content) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
        }

        const newMessage = {
            senderId: senderId,
            content: content,
            sentAt: new Date()
        };

        const messageDoc = await Message.findOneAndUpdate(
            { id1: id1, id2: id2 },
            { $push: { messages: newMessage } },
            { new: true, upsert: true }
        );

        res.json({
            status: 200,
            message: "Tin nhắn đã được gửi",
            data: messageDoc
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { id1, id2 } = req.body;

        if (!id1 || !id2) {
            return res.status(400).json({ message: 'Thiếu id của 1 trong 2 người dùng' });
        }

        const messages = await Message.findOne({ id1: id1, id2: id2 });

        if (!messages) {
            return res.status(404).json({ message: 'Không tìm thấy tin nhắn' });
        }

        res.json({
            status: 200,
            messages: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};