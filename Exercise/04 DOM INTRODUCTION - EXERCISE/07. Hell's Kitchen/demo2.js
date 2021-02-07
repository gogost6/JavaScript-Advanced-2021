function solve() {
    document.querySelector('#btnSend').addEventListener('click', onClick);
    let input = document.querySelector('#inputs textarea')
    let bestRes = document.getElementById('bestRestaurant').lastElementChild
    let workersOutput = document.getElementById('workers').lastElementChild
  
    function onClick() {
       let resId = 0;
  
       let data = JSON.parse(input.value).reduce((a, b) => {
          let [res, workers] = b.split(' - ');
  
          workers = workers.split(', ').reduce((a, b) => {
             let [name, sal] = b.split(' ');
             return { ...a, [name]: Number(sal) };
          }, {})
  
          if (a[res]) {
             a[res].workers = { ...a[res].workers, ...workers };
          } else {
             a = { ...a, [res]: { id: resId, workers } };
             resId++;
          }
          return a;
       }, {})
  
       let bestResData = Object.entries(data)
          .sort((a, b) => avg(Object.values(b[1].workers)) - avg(Object.values(a[1].workers)) || a.id - b.id)[0]
  
       bestRes.textContent =
          `Name: ${bestResData[0]} ` +
          `Average Salary: ${(avg(Object.values(bestResData[1].workers))).toFixed(2)} ` +
          `Best Salary: ${(max(Object.values(bestResData[1].workers))).toFixed(2)} `
  
       workersOutput.textContent = Object.entries(bestResData[1].workers)
          .sort((a, b) => b[1] - a[1])
          .map(x => {
             return `Name: ${x[0]} With Salary: ${x[1]}`
          }).join(' ')
    }
  
    function avg(arr) {
       return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
  
    function max(arr) {
       return arr.reduce((a, b) => b > a ? b : a, 0);
    }
 }