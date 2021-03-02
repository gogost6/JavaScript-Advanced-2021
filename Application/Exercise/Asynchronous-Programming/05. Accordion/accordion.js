async function solution() {
    const main = document.getElementById('main');
    
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const responce = await fetch(url);
    const data = await responce.json();
    
    Object.values(data).forEach(x => {
        details(x);
    });

    async function details(a) {
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${a._id}`;
        const responce = await fetch(url);
        const data = await responce.json();

        const title = data.title;
        const content = data.content;

        const accordion = createEl('div', 'accordion');
        const head = createEl('div', 'head');
        let span = createEl('span');
        span.textContent = title;
        let button = createEl('button', 'button', 'More');
        button.id = data._id;
        head.append(span, button);
        const extra = createEl('div', 'extra');
        let p = createEl('p');
        p.textContent = content;
        extra.appendChild(p);
        accordion.append(head, extra);
        main.appendChild(accordion);
    }

    main.addEventListener('click', function (e) {
        if (e.target.tagName == 'BUTTON') {
            if (e.target.textContent == 'More') {
                e.target.textContent = 'Less';
                e.target.parentNode.nextSibling.style.display = 'block';
            } else {
                e.target.textContent = 'More';
                e.target.parentNode.nextSibling.style.display = 'none';
            }
        }
    })

    function createEl(type, className, content) {
        let element = document.createElement(type);

        if (className) {
            element.className = className;
        }

        if (content) {
            element.textContent = content
        }

        return element;
    }
}
solution();