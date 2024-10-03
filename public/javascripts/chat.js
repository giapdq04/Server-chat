var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Lấy userId từ URL
const urlParams = new URLSearchParams(window.location.search);
const id2 = urlParams.get('userId');

socket.on('connect', function () {
    console.log('Da ket noi');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName, message: input.value, socketId: socketId })
        }).then(response => response.json()).then(data => {
            input.value = '';
        });
    }
});

socket.on('chat message', function (data) {
    var item = document.createElement('li');
    item.textContent = data.name + ': ' + data.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Fetch initial messages
fetch(`/layTinNhan?id1=${currentUser._id}&id2=${id2}`)
    .then(response => response.json())
    .then(data => {
        data.messages.forEach(message => {
            var item = document.createElement('li');
            item.textContent = message.senderId + ': ' + message.content;
            messages.appendChild(item);
        });
        window.scrollTo(0, document.body.scrollHeight);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Đã xảy ra lỗi khi tải tin nhắn: ' + error.message);
    });