function toggle() {
    let button = document.querySelector('.button');
    let divExtra = document.querySelector('#extra')

    console.log(divExtra.style.display);
    divExtra.style.display = divExtra.style.display === 'none' || divExtra.style.display === ''
        ? 'block' : 'none';
    button.textContent = button.textContent == 'More' ? 'Less' : 'More';
}