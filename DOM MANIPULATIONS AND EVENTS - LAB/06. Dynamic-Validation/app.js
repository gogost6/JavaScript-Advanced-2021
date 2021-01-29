function validate() {
    const regex = /[a-z]+@[a-z]+\.[a-z]+/gm;
    let input = document.getElementById('email');
    let value = input.value;

    input.addEventListener('change',checkEmail);

       function checkEmail(event) {
           if(event.value.match(regex)){
               event.removeAttribute('class');
               return;
           }
           event.className = "error"
        }
}