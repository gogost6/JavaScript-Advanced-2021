async function attachEvents() {
    const submit = document.querySelector('input#submit');
    const refresh = document.querySelector('input#refresh');
    const divControls = document.querySelector('div#controls');
    const messagesTextArea = document.getElementById('messages');
    divControls.addEventListener('click', function(e) {
        if(e.target.type == 'button' && e.target.value == 'Send') {
            postData({author: divControls.children[1].value, content: divControls.children[4].value});
            divControls.children[1].value = '';
            divControls.children[4].value = '';
        } else if(e.target.type == 'button' && e.target.value == 'Refresh') {
            messagesTextArea.disabled = false;
            getData(messagesTextArea);
        }
    })
    
    async function postData(data) {
        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                author: data.author,
                content: data.content
            })
        });
    }

    async function getData(textArea) {
        textArea.innerHTML = '';
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();
        let result = [];
        Object.values(data).forEach(x => {
            result.push(`${x.author}: ${x.content}`);
        });;
        textArea.innerHTML = result.join('\n');
    }
}

attachEvents();