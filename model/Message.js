const { mongoose } = require('../db');

const messageSchema = new mongoose.Schema(
    {
        id1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        id2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        messages: [
            {
                senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                content: { type: String, required: true },
                sentAt: { type: Date, default: Date.now }
            }
        ]
    },
    {
        timestamps: true,
        collection: 'Message',
        versionKey: false
    }
);

// Thêm chỉ mục để cải thiện hiệu suất truy vấn
messageSchema.index({ id1: 1, id2: 1 });

let Message = mongoose.model('Message', messageSchema);

module.exports = { Message };