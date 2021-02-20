function solve() {
   const author = document.querySelector('input#creator');
   const title = document.querySelector('input#title');
   const category = document.querySelector('input#category');
   const content = document.querySelector('textarea#content');
   const section = document.querySelectorAll('section')[1];
   const asside = document.querySelector('section.archive-section')
   const ol = document.querySelector('ol');
   document.querySelector('button.btn.create').addEventListener('click', function (e) {
      e.preventDefault();
      let isValid = (x) => x == '';
      if ([author.value, title.value, category.value, content.value].some(isValid)) {
         return;
      }
      const delButton = createEl('button', 'btn delete', 'Delete');
      const arhiveButton = createEl('button', 'btn archive', 'Archive');
      const article = createEl('article');
      const div = createEl('div', 'buttons');
      const p1 = createEl('p', undefined, 'Category:');
      const strong1 = createEl('strong');
      const strong2 = createEl('strong');
      const p2 = createEl('p', undefined, 'Creator:');
      const p3 = createEl('p');
      const header = createEl('h1');
      header.textContent = title.value;
      strong1.textContent = category.value;
      p1.appendChild(strong1);
      strong2.textContent = author.value;
      p2.appendChild(strong2)
      p3.textContent = content.value;
      div.appendChild(delButton);
      div.appendChild(arhiveButton);
      article.appendChild(header);
      article.appendChild(p1);
      article.appendChild(p2);
      article.appendChild(p3);
      article.appendChild(div);
      section.appendChild(article);
      author.value = '';
      title.value = '';
      category.value = '';
      content.value = '';

      
   })

   document.querySelector('main').addEventListener('click', function (e) {
      if (e.target.className == 'btn delete') {
         e.target.parentElement.parentElement.remove();
      } else if (e.target.className == 'btn archive') {
         const art = e.target.parentElement.parentElement;
         const child = art.children[0];
         const li = createEl('li');
         li.textContent = child.textContent;
         ol.appendChild(li);
         let newArr = Array.from(ol.children).sort((a,b) => a.textContent.localeCompare(b.textContent));
         Array.from(ol.children).forEach(x => x.remove);
         newArr.forEach(x => ol.appendChild(x));            
         art.remove();
      }
   })

   function createEl(type, className, content) {
      let result = document.createElement(type);

      if (className) {
         result.className = className;
      }

      if (content) {
         result.textContent = content;
      }

      return result;
   }
}
