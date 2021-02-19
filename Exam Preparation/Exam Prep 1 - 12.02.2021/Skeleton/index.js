function solve() { // NOT FINISHED!!!!
    const [name, date] = document.querySelectorAll('input');
    const moduleName = document.querySelector('select');
    let lectures = {};
    const modulesOutput = document.querySelector('div.modules');
    document.querySelector('button').addEventListener('click', function (e) {
        e.preventDefault();

        if(name.value == '' || date.value == '' || moduleName.value == 'Select module') {
            return;
        }

        const h4 = createElement('h4', undefined, `${name.value} - ${date.value.split('-').join('/').split('T').join(' - ')}`);
        const button = createElement('button', 'red', 'Del');
        const li = createElement('li', 'flex');

        li.appendChild(h4);
        li.appendChild(button);

        let div;
        let ul;
        let lis;;
        if(!lectures[moduleName.value]) {
            const h3 = createElement('h3', undefined, `${moduleName.value.toUpperCase()}-MODULE`);
            ul = createElement('ul');
            lis = [];
            div = createElement('div', 'module');

            div.appendChild(h3);
            div.appendChild(ul);
            
            lectures[moduleName.value] = {div, ul, lis};
        } else {
            div = lectures[moduleName.value].div;
            ul = lectures[moduleName.value].ul;
            lis = lectures[moduleName.value].lis;
        }

        lis.push({li, date: date.value})
        
        lis.sort((a,b) => a.date.localeCompare(b.date)).forEach(({li}) => {
            ul.appendChild(li);
            console.log(li);
        });

        modulesOutput.appendChild(div);
    })
    
    
    
    
    
    
    

    function createElement(type, className, content) {
        let result = document.createElement(type);

        if(className) {
            result.className = className;
        }

        if(content) {
            result.textContent = content;
        }

        return result;
    }
}