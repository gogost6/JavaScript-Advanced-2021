function solve() {
    const task = document.querySelector('input#task');
    const descr = document.querySelector('textarea#description');
    const dueDate = document.querySelector('input#date');
    const open = document.querySelectorAll('section')[1];
    const inProgress = document.querySelectorAll('section')[2];
    const complete = document.querySelectorAll('section')[3];
    document.querySelector('button#add').addEventListener('click', function (e) {
        e.preventDefault();
        //let obj = {};
        let isValid = (x) => x == '';
        if ([task.value, descr.value, dueDate.value].some(isValid)) {
            return;
        }
        const startButton = createEl('button', 'green', 'Start');
        const deleteButton = createEl('button', 'red', 'Delete');
        const div = createEl('div', 'flex');
        const p1 = createEl('p');
        const p2 = createEl('p');
        const h3 = createEl('h3');
        const article = createEl('article');
        div.appendChild(startButton);
        div.appendChild(deleteButton);
        h3.textContent = task.value;
        p1.textContent = `Description: ${descr.value}`;
        article.appendChild(h3);
        article.appendChild(p1);
        p2.textContent = `Due Date: ${dueDate.value}`;
        article.appendChild(p2);
        article.appendChild(div);
        open.children[1].appendChild(article);

        open.addEventListener('click', function (e) {
            if (e.target.className == 'green') {
                const move = e.target.parentElement.parentElement;
                move.children[3].remove();
                const finishButton = createEl('button', 'orange', 'Finish');
                const del = createEl('button', 'red', 'Delete');
                const divOpen = createEl('div', 'flex');
                divOpen.appendChild(del);
                divOpen.appendChild(finishButton);
                move.appendChild(divOpen);
                inProgress.children[1].appendChild(move);
            } else if (e.target.className == 'red') {
                e.target.parentElement.parentElement.remove();
            }
        })

        inProgress.addEventListener('click', function (e) {
            if (e.target.className == 'red') {
                e.target.parentElement.parentElement.remove();
            } else if (e.target.className == 'orange') {
                const move = e.target.parentElement.parentElement;
                move.children[3].remove();
                complete.children[1].appendChild(move);
            }
        })
    })

    function createEl(type, className, text) {
        let element = document.createElement(type);

        if (className) {
            element.className = className;
        }

        if (text) {
            element.textContent = text;
        }
        return element;
    }

}