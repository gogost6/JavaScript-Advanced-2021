function solve() {
  let input = document.getElementById('text').value.toLowerCase().split(' ');
  let currentCase = document.getElementById('naming-convention').value;
  if (currentCase == 'Camel Case') {
    for (let i = 1; i < input.length; i++) {
      let element = input[i].split('');
      let a = element[0].toUpperCase();
      element[0] = a;
      input[i] = element.join('');
    }
    document.getElementById('result').textContent = input.join('');
  } else if (currentCase == 'Pascal Case') {
    for (let i = 0; i < input.length; i++) {
      let element = input[i].split('');
      let a = element[0].toUpperCase();
      element[0] = a;
      input[i] = element.join('');
    }
    document.getElementById('result').textContent  = input.join('');
  } else {
    document.getElementById('result').textContent = 'Error!'
  }
}
