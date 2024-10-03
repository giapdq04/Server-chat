var express = require('express');
var router = express.Router();
var UserCtrl = require('../controller/UserController');
var MsgCtrl = require('../controller/MessageController');


// đăng ký
router.post('/dangKy', UserCtrl.dangKy);

// đăng nhập
router.post('/dangNhap', UserCtrl.dangNhap);

// xem danh sách user
router.get('/xemDanhSach', UserCtrl.xemDanhSach);

// Lấy thông tin người dùng
router.get('/layThongTinUser', UserCtrl.getUserInfo);

router.post('/guiTinNhan', MsgCtrl.sendMessage);

router.get('/layTinNhan', MsgCtrl.getMessages);

module.exports = router;