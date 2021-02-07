function colorize() {
    [...document.querySelectorAll('table tr:nth-child(even)')].forEach(x => {
        x.style.background = 'teal';
    });
}