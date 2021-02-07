function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);
   let input = document.querySelector('#inputs>textarea')
   let bestR = document.querySelector('#bestRestaurant>p');
   let bestW = document.querySelector('#workers>p');
   function onClick() {
      let result = ``;
      let restaurants = {};
      let data = JSON.parse(input.value).forEach(x => {
         let workers = [];
         let [res, a] = x.split(' - ');
         let b = a.split(', ').forEach(y => {
            let [name, salary] = y.split(' ');
            workers.push({ [name]: Number(salary) });
         });
         if (!restaurants[res]) {
            restaurants[res] = workers;
         } else {
            workers = workers.concat(restaurants[res]);
            restaurants[res] = workers;
         }
      });
      let bR = av(restaurants);
      bestR.textContent = bR;
      let key = bR.split(' ')[1];
      restaurants[key].forEach(w => {
         let workerData = Object.entries(w);
         let nameW = workerData[0];
         let sW = workerData[0];
         result += `Name: ${nameW[0]} With Salary: ${sW[1]} `;
      })
      bestW.textContent = result;

      function av(restaurants) {
         let keys = Object.keys(restaurants);
         let winner = ``;
         let avSal = 0;
         for (let i = 0; i < keys.length; i++) {
            let value = 0;
            let newOne = 0;
            restaurants[keys[i]]
               .sort((a, b) => Object.values(b) - Object.values(a))
               .forEach(z => {
                  value += Number(Object.values(z));
               })
            newOne = (value / restaurants[keys[i]].length).toFixed(2);
            if (newOne > avSal) {
               let bestSalary = Object.values((Object.values(restaurants[keys[i]])[0]));
               winner = `Name: ${keys[i]} Average Salary: ${newOne} Best Salary: ${bestSalary[0].toFixed(2)}`;
               avSal = newOne;
            } else {
               winner = `Name: ${keys[i]} Average Salary: ${avSal} Best Salary: ${restaurants[keys[i]][0]}`;
            }
         }
         return winner;
      }
   }
}