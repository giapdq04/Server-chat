const { mongoose } = require('../db')
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: false,
        collection: 'User',
        versionKey: false
    }
)

let User = mongoose.model('User', userSchema)

module.exports = { User }