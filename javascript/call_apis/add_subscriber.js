import { token_admin, token_user } from './default_tokens.js';
import { subscriberUrls } from './default_apis.js';

document.getElementById('subscribe_form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
    validateSubscribeForm(); // Gọi hàm validateSubscribeForm()
});

function validateSubscribeForm() {
    // Lấy giá trị từ các trường đầu vào
    let emailUserSignUp = document.querySelector('.input-email').value;

    // Kiểm tra các trường đầu vào
    if (emailUserSignUp === '') {
        showAlert('Please enter your email address.', 2000, 'mfoody_fail');
        return false;
    }

    if (!validateEmail(emailUserSignUp)) {
        showAlert('Please enter a valid email address.', 2000, 'mfoody_fail');
        return false;
    }

    // Nếu không có lỗi, tiến hành thêm mới người dùng
    let newSubscriber = {
        emailSubscriber: emailUserSignUp,
    };

    // Gửi yêu cầu tạo người dùng mới
    axios.post(subscriberUrls.subscriber_add_local, newSubscriber)
        .then(function (response) {
            console.log(response);
            showAlert('You successfully subscribe!!', 2000, 'mfoody_success');

            // Hide Subscribe
            document.querySelector('#subscribeMfoody').style.display = 'none';
        })
        .catch(function (error) {
            console.log(error);
            showAlert('You already subscribed!', 2000, 'mfoody_fail');
        });

    return true;
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}