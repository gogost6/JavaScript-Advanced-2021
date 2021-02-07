function onClick(input) {
      
   let restaurants = {};
   let data = input.forEach(x => {
      let workers = [];
      let [res, a] = x.split(' - ');
      let b = a.split(', ').forEach(y => {
         let [name, salary] = y.split(' ');
         workers.push({ [name]: Number(salary) });
      });
      if(!restaurants[res]) {
      restaurants[res] = workers;
      } else {
         workers = workers.concat(restaurants[res]);
         restaurants[res] = workers;
      }
   });

   
} 
onClick(["PizzaHut - Peter 500, George 300, Mark 800",
"TheLake - Bob 1300, Joe 780, Jane 660"]
)