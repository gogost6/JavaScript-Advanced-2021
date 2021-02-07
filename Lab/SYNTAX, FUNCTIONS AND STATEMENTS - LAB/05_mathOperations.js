function solve(a,b,c) {
    c == '+' ? console.log(a + b):
     c == '-'? console.log(a-b):
     c == '*'? console.log(a*b):
     c == '/'? console.log(a/b):
     c == '%'? console.log(a%b):
     console.log(a**b);
}
solve(5, 6, '+');
solve(3, 5.5, '*')