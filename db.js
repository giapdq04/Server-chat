const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://quanggiap04:5HvKcA8rb5xsdJ3F@cluster0.erwyc.mongodb.net/Chat-App')
    .then(() => console.log('Kết nối thành công'))
    .catch((err) => {
        console.log("Lỗi kết nối CSDL");
        console.log(err);
    });

module.exports = { mongoose }