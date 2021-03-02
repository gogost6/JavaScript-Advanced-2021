async function attachEvents() {
    const load = document.getElementById('btnLoadPosts');
    const view = document.getElementById('btnViewPost');
    const posts = document.getElementById('posts');

    load.addEventListener('click', async function() {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const responce = await fetch(url);
        const data = await responce.json();
        Object.entries(data).forEach(x => {
            const option = createEl('option', undefined, x[1].title.toUpperCase());
            option.value = x[0];
            posts.appendChild(option);
        });
    })

    view.addEventListener('click', async function() {
        const ul = createEl('ul');
        ul.id = 'post-comments';

        const url = `http://localhost:3030/jsonstore/blog/comments`;
        const responce = await fetch(url);
        const data = await responce.json();
        
        let newData = Object.entries(data).filter(x => x[1].postId == posts.value)

        let title = await postTitle(posts.value);
        let content = await postContent(posts.value);

        document.getElementById('post-title').textContent = title;
        document.getElementById('post-body').textContent = content;

        newData.forEach(x => {
            document.getElementById('post-comments').appendChild(createEl('li', undefined, x[1].text)); 
        })
    })


    async function postTitle(id) {
        const url = `http://localhost:3030/jsonstore/blog/posts/${id}`;
        const responce = await fetch(url);
        const data = await responce.json();
        const title = Object.values(data)[2];
        return title;
    }

    async function postContent(id) {
        const url = `http://localhost:3030/jsonstore/blog/posts/${id}`;
        const responce = await fetch(url);
        const data = await responce.json();
        const content = Object.values(data)[0];
        return content;
    }
    
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

attachEvents();