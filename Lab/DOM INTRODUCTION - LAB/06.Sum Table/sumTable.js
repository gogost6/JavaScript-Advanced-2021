function sumTable() {
    let numbers = [...document.querySelectorAll('tbody td')];
    let sum = 0;
    for(let i = 1; i < numbers.length; i += 2) {
        sum += Number(numbers[i].textContent);
    }
    document.getElementById('sum').textContent = sum;
}