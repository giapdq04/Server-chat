const { Message } = require("../model/Message");

let io;

exports.setSocketIo = (socketIo) => {
    io = socketIo;
};

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

        // Kiểm tra xem có item nào có id1 và id2 không
        let messageDoc = await Message.findOne({ id1: id1, id2: id2 });

        if (!messageDoc) {
            // Nếu không tìm thấy, thử đảo lại id
            messageDoc = await Message.findOne({ id1: id2, id2: id1 });
        }

        if (messageDoc) {
            // Nếu tìm thấy, cập nhật tin nhắn
            messageDoc = await Message.findOneAndUpdate(
                { _id: messageDoc._id },
                { $push: { messages: newMessage } },
                { new: true }
            );
        } else {
            // Nếu không tìm thấy, tạo mới
            messageDoc = new Message({
                id1: id1,
                id2: id2,
                messages: [newMessage]
            });
            await messageDoc.save();
        }

        // Phát ra sự kiện chat message qua Socket.IO
        io.emit('chat message', newMessage);

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
        const { id1, id2 } = req.query;

        if (!id1 || !id2) {
            return res.status(400).json({ message: 'Thiếu id của 1 trong 2 người dùng' });
        }

        let messages = await Message.findOne({ id1: id1, id2: id2 });

        if (!messages) {
            // Nếu không tìm thấy, thử đảo lại id
            messages = await Message.findOne({ id1: id2, id2: id1 })
        }

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