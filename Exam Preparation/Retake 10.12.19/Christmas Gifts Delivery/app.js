function solution() {
    let addGift = document.getElementsByTagName('div')[1];
    const listOfGifts = document.getElementsByClassName('card')[1];
    const sentGifts = document.getElementsByClassName('card')[2];
    const discardedGifts = document.getElementsByClassName('card')[3];
    let li = document.createElement('li');
    li.setAttribute('class', 'gift');

    addGift.children[1].addEventListener('click', function (e) {
        let gift = e.target.previousElementSibling;
        listOfGifts.children[1].appendChild(li);
        li.textContent = gift.value;
        const sendButton = document.createElement('button');
        sendButton.setAttribute('íd', 'sendButton');
        sendButton.textContent = 'Send';
        const discardButton = document.createElement('button');
        discardButton.setAttribute('íd', 'discardButton');
        discardButton.textContent = 'Discard';
        li.appendChild(sendButton);
        li.appendChild(discardButton);
        let arr = Array.from(listOfGifts.children[1].children);

        if (arr.length > 1) {
            arr.sort((a, b) => a.textContent.localeCompare(b.textContent));
        }

        while (listOfGifts.children[1].firstChild) {
            listOfGifts.children[1].firstChild.remove();
        }

        for (const el of arr) {
            listOfGifts.children[1].appendChild(el);
        }

        li = document.createElement('li');
        li.setAttribute('class', 'gift');
        gift.value = '';
    });

    listOfGifts.addEventListener('click', function (e) {
        if (e.target.innerText == 'Send') {
            const text = e.target.parentNode;
            li.textContent = text.childNodes[0].textContent;
            sentGifts.children[1].appendChild(li);
            e.target.parentNode.remove();
            li = document.createElement('li');
            li.setAttribute('class', 'gift');
        } else if (e.target.innerText == 'Discard') {
            const text = e.target.parentNode;
            li.textContent = text.childNodes[0].textContent;
            discardedGifts.children[1].appendChild(li);
            e.target.parentNode.remove();
            li = document.createElement('li');
            li.setAttribute('class', 'gift');
        }
    });
}