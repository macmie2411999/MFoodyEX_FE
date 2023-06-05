// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { addFeedBackMailMfoodyApi } from './feed_back_mail_apis.js';
import { feedbackUrls } from './default_apis.js';

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

document.getElementById('feed_back_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
    validateFeedbackForm(); // Gọi hàm validateSignUpForm()
  });

function validateFeedbackForm() {
    // Lấy giá trị từ các trường đầu vào
    let nameUserFeedbackMail = document.getElementById('Name').value;
    let emailUserFeedbackMail = document.getElementById('Email').value;
    let titleFeedbackMail = document.getElementById('Title').value;
    let contentFeedbackMail = document.getElementById('Message').value;

    // Kiểm tra các trường đầu vào
    if (emailUserFeedbackMail === '') {
        showAlert('Please enter your email address.', 2000, 'mfoody_fail');
        return false;
    }

    if (!validateEmail(emailUserFeedbackMail)) {
        showAlert('Please enter a valid email address.', 2000, 'mfoody_fail');
        return false;
    }

    if (nameUserFeedbackMail === '') {
        showAlert('Please enter your name.', 2000, 'mfoody_fail');
        return false;
    }

    if (nameUserFeedbackMail.length < 6) {
        showAlert('Your name must be at least 6 characters.', 2000, 'mfoody_fail');
        return false;
    }

    if (titleFeedbackMail === '') {
        showAlert('Please enter the title of your feedback.', 2000, 'mfoody_fail');
        return false;
    }

    if (titleFeedbackMail.length < 6) {
        showAlert('Your feedback must be at least 6 characters.', 2000, 'mfoody_fail');
        return false;
    }

    if (contentFeedbackMail === '') {
        showAlert('Please enter the content of your feedback.', 2000, 'mfoody_fail');
        return false;
    }

    if (contentFeedbackMail.length < 6) {
        showAlert('Content of your feedback must be at least 6 characters.', 2000, 'mfoody_fail');
        return false;
    }

    // Nếu không có lỗi, tiến hành thêm mới người dùng
    let newFeedback = {
        nameUserFeedbackMail: nameUserFeedbackMail,
        emailUserFeedbackMail: emailUserFeedbackMail,
        titleFeedbackMail: titleFeedbackMail,
        contentFeedbackMail: contentFeedbackMail,
    };

    // Gửi yêu cầu tạo người dùng mới
    axios.post(feedbackUrls.feedback_add_local, newFeedback)
        .then(function (response) {
            console.log(response);
            showAlert('Your feedback has been sent!', 2000, 'mfoody_success');
            setTimeout(() => {
                location.reload();
            }, 4000);
        })
        .catch(function (error) {
            console.log(error);
            showAlert('Please check your feedback information!', 2000, 'mfoody_fail');
        });

    return true;
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}









