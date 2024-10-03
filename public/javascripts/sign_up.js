document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nameForm');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định

            const username = document.getElementById('nameInput').value;
            const password = document.getElementById('passwordInput').value;

            try {
                const response = await fetch('/api/dangKy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();
                if (result.status === 200) {
                    alert('Đăng ký thành công');
                    // Chuyển hướng đến trang chat hoặc trang khác
                    window.location.href = '/login.html';
                } else {
                    alert('Đăng ký thất bại: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi đăng ký');
            }
        });
    } else {
        console.error('Form not found');
    }
});