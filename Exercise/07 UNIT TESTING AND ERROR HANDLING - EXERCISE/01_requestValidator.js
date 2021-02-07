function solve(obj) {
    
    if (obj.method == undefined || !['GET', 'POST', 'DELETE', 'CONNECT'].includes(obj.method)) {
        throw new Error(`Invalid request header: Invalid Method`)
    }

    if (obj.uri == undefined || /(^[\w\.]+$)|(^[\*]$)/g.test(obj.uri) == false) {
        throw new Error(`Invalid request header: Invalid URI`);
    }

    if (obj.version == undefined || !['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].includes(obj.version)) {
        throw new Error(`Invalid request header: Invalid Version`);
    }


    if (obj.message == undefined || /^[^<>\&\\'"]+$|[0-9]+|^$/g.test(obj.message) == false) {
        throw new Error(`Invalid request header: Invalid Message`);
    }
    return obj;
}
console.log(solve({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: 'asl\\pls'
}));
// console.log(solve({
//     method: 'GET',
//     uri: 'kkk jjjj',
//     version: 'HTTP/0.8',
//     message: ''
// }));
// console.log(solve({
//     method: 'OPTIONS',
//     uri: 'git.master',
//     version: 'HTTP/1.1',
//     message: '-recursive'
// }));
// console.log(solve({
//     method: 'GET',
//     uri: 'svn.public.catalog',
//     version: 'HTTP/1.1',
//     message: ''
// }));