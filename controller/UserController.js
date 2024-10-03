
const { User } = require("../model/User");

exports.dangKy = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required' });
        }

        const objUser = new User({
            username: username,
            password: password,
        });

        const result = await objUser.save();
        if (result) {
            res.json({
                status: 200,
                message: "Đăng ký thành công",
            });
        } else {
            res.json({
                status: 400,
                message: "Đăng ký thất bại",
            });
        }
    } catch (error) {
        console.error(error); // Log lỗi ra console để kiểm tra
        res.status(500).json({ message: error.message });
    }
};

exports.dangNhap = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required' });
        }

        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({
            status: 200,
            message: "Đăng nhập thành công",
            user: user
        });
    } catch (error) {
        console.error(error); // Log lỗi ra console để kiểm tra
        res.status(500).json({ message: error.message });
    }
};

exports.xemDanhSach = async (req, res) => {
    try {
        const listUser = await User.find();
        res.json({
            status: 200,
            data: listUser,
        });
    } catch (error) {
        console.error(error); // Log lỗi ra console để kiểm tra
        res.status(500).json({ message: error.message });
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);
        if (user) {
            res.json({
                status: 200,
                user: user
            });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error(error); // Log lỗi ra console để kiểm tra
        res.status(500).json({ message: error.message });
    }
};
