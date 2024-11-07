document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission

    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach((el) => el.textContent = '');

    // Validate Name
    const name = document.getElementById('name').value;
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        document.getElementById('nameError').textContent = 'Name can only contain letters and spaces.';
        valid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Validate Password
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long, with numbers and special characters.';
        valid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById('phone').value;
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Phone number must be 10 digits.';
        valid = false;
    }

    // Validate Message
    const message = document.getElementById('message').value;
    if (message.length > 200) {
        document.getElementById('messageError').textContent = 'Message cannot exceed 200 characters.';
        valid = false;
    }

    // Show success message if everything is valid
    if (valid) {
        document.getElementById('successMessage').textContent = 'Form submitted successfully!';
        document.getElementById('registrationForm').reset();
    }
});
