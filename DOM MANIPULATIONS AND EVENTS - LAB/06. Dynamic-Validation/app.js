function validate() {
    const regex = /[a-z]+@[a-z]+\.[a-z]+/gm;
    let input = document.getElementById('email');

    input.addEventListener('change', checkEmail);

    function checkEmail(event) {
        if (event.target.value.match(regex)) {
            event.target.removeAttribute('class');
            return;
        }
        event.target.className = "error"
    }
}