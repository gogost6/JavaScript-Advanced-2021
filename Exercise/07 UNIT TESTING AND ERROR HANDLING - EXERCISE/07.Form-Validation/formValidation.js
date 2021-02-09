function validate() {
    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/g;
    const passwordPattern = /^[\w]{5,15}$/g;
    const emailPattern = /^.+@.*[.]{1,}.*$/g;
    const companyNumberPattern = /^[1-9][0-9]{3}$/g;

    const companyNumber = document.getElementById('companyNumber');
    const companyInfo = document.getElementById('companyInfo');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let email = document.getElementById('email');
    const valid = document.getElementById('valid');

    let isChecked = false;
    const checkbox = document.getElementById('company').addEventListener('change', (e) => {
        if (e.target.checked) {
            isChecked = true;
            companyInfo.style.display = 'block';
        } else {
            companyInfo.style.display = 'none';
        }
    });

    document.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault();
        let isValid = true;
        if (!usernamePattern.test(username.value)) {
            isValid = false;
            username.style.borderColor = "red";
        } else {
            username.style.border = "none";
        }

        if (!emailPattern.test(email.value)) {
            isValid = false;
            email.style.borderColor = "red";
        } else {
            email.style.border = "none";
        }

        if (!passwordPattern.test(password.value) && !passwordPattern.test(confirmPassword.value) || password.value != confirmPassword.value) {
            isValid = false;
            confirmPassword.style.borderColor = "red";
            password.style.borderColor = "red";
        } else {
            password.style.border = "none";
            confirmPassword.style.border = "none";
        }

        if (isChecked) {
            if (!companyNumberPattern.test(companyNumber.value)) {
                isValid = false;
                companyNumber.style.borderColor = 'red';
            } else {
                companyNumber.style.border = 'none';
            }
        }

        if (isValid) {
            valid.style.display = 'block';
        } else {
            valid.style.display = 'none';
        }
    })
}