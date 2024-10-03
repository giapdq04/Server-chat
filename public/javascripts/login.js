document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nameForm');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định

            const username = document.getElementById('nameInput').value;
            const password = document.getElementById('passwordInput').value;

            try {
                const response = await fetch('/api/dangNhap', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();
                if (result.status === 200) {
                    alert('Đăng nhập thành công');
                    // Lưu thông tin người dùng vào localStorage
                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                    // Chuyển hướng đến trang danh bạ
                    window.location.href = '/contacts.html';
                } else {
                    alert('Đăng nhập thất bại: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi đăng nhập');
            }
        });
    } else {
        console.error('Form not found');
    }
});