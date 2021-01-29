function solve() {
   let result = ``;
   let productsArr = [];
   let buttons = document.getElementsByTagName('button');
   let product = document.getElementsByClassName('product');
   let total = 0;
   let textArea = document.getElementsByTagName('textarea')[0];

   document.getElementsByClassName('checkout')[0].addEventListener('click', function () {
      textArea.textContent += `You bought ${productsArr.join(', ')} for ${total.toFixed(2)}.`
      for (let j = 0; j < buttons.length; j++) {
         buttons[j].disabled = true;
      }
   });

   for (let i = 0; i < 3; i++) {
      const money = Number(product[i].children[3].textContent);
      const child = product[i].children[1];
      const name = child.children[0].textContent;
      document.getElementsByTagName('button')[i].addEventListener('click', function () {
         if (!productsArr.includes(name)) {
            productsArr.push(name);
         }
         total += money;
         result = `Added ${name} for ${money.toFixed(2)} to the cart.\n`
         textArea.textContent += result;
      })
   }
}