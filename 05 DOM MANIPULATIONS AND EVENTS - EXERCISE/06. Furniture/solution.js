function solve() {
  const textareas = document.getElementsByTagName('textarea');
  const buttons = document.getElementsByTagName('button');
  const body = document.querySelector('tbody');


  function createCell(type, textContent, attribute) {
    const cell = document.createElement('td');
    const content = document.createElement(type);
    if (attribute) {
      content.setAttribute(attribute[0], attribute[1]);
    }
    content.textContent = textContent;
    cell.appendChild(content);
    return cell;
  }

  buttons[0].addEventListener('click', function (e) {
    let arr = JSON.parse(textareas[0].value);

    for (let el of arr) {
      const row = document.createElement('tr');
      const cellImage = createCell('img', '', ['src', el.img]);
      const cellCheck = createCell('input', '', ['type', 'checkbox'])
      const cellName = createCell('p', el.name);
      const cellPrice = createCell('p', el.price);
      const cellDecor = createCell('p', el.decFactor);

      row.appendChild(cellImage);
      row.appendChild(cellName);
      row.appendChild(cellPrice);
      row.appendChild(cellDecor);
      row.appendChild(cellCheck);

      body.appendChild(row);
    }
  });

  buttons[1].addEventListener('click', function (e) {
    const furniture = Array.from(body.querySelectorAll('input[type=checkbox]:checked'));
    if(furniture.length > 0) {
      const result = Array.from(body.querySelectorAll('input[type=checkbox]:checked'))
      .map(input => input.parentNode.parentNode)
      .reduce((result, row) => {
      const cells = row.children;

      const name = cells[1].children[0].textContent;
      result.bought.push(name);

      const price = Number(cells[2].children[0].textContent);
      result.totalPrice += price;

      const factor = Number(cells[3].children[0].textContent);
      result.decFactorSum += factor;

      return result;
    }, {
      bought: [],
      totalPrice: 0,
      decFactorSum: 0
    })

    textareas[1].value = `Bought furniture: ${result.bought.join(', ')}\nTotal price: ${result.totalPrice.toFixed(2)}\nAverage decoration factor: ${(result.decFactorSum / furniture.length)}`;
    }
  })
}