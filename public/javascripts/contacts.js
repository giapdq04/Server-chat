document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/xemDanhSach');
        const result = await response.json();

        if (result.status === 200) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const userList = document.getElementById('userList');
            result.data
                .filter(user => user._id !== currentUser._id) // Loại bỏ người dùng hiện tại khỏi danh sách
                .forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.username;
                    li.addEventListener('click', function() {
                        window.location.href = `/chat.html?userId=${user._id}`;
                    });
                    userList.appendChild(li);
                });
        } else {
            alert('Không thể tải danh sách người dùng: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi tải danh sách người dùng');
    }
});