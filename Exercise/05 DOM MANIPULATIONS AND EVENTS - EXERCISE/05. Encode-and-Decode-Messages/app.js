function encodeAndDecodeMessages() {
    const textareas = document.getElementsByTagName('textarea');
    const button = document.getElementsByTagName('button');

    const map = {
        encode: {
            text: textareas[0],
            btn: button[0],
            func: (char) => String.fromCharCode(char.charCodeAt(0) + 1)
        },
        decode: {
            text: textareas[1],
            btn: button[1],
            func: (char) => String.fromCharCode(char.charCodeAt(0) - 1)
        }
    }

    document.getElementById('main').addEventListener('click', function (e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        const type = e.target.textContent.toLowerCase().trim().includes('encode') ? 'encode' : 'decode';

        const message = map[type].text.value
            .split('').map(map[type].func).join('');
        
        map.encode.text.value = '';
        map.decode.text.value = message;
    })
}