function solve() {
  let text = document.getElementById('input').value
    .split('.')
    .filter(x => x != '');
  console.log(text);
  let output = document.getElementById('output');
  let result = ``;  // `<p>${text.join('.')}</p>`

  if (text.length % 3 == 0) {
    for (let i = 0; i < text.length; i += 3) {
      result += `<p>${text[i]}.` + `${text[i + 1]}.` + `${text[i + 2]}.</p>`;
    }
  } else {
    let a = text.length % 3;
    let b = text.length - a;
    for (let i = 0; i < text.length - a; i += 3) {
      result += `<p>${text[i]}.` + `${text[i + 1]}.` + `${text[i + 2]}.</p>`;
    }
    if (a == 1) {
      result += `<p>${text[b]}.</p>`
    } else {
      result += `<p>${text[b]}.` + `${text[b + 1]}.</p>`
    }
  }
  output.innerHTML = result;
}