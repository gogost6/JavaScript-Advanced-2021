class Request {
    constructor (method ,uri ,version ,message ,response ,fulfilled) {
        Object.assign(this, {method ,uri ,version ,message , response: undefined, fulfilled: false});
    }
}
let myData = new Request('GET', 'http://google.com', 'HTTP/1.1', '')
console.log(myData);
