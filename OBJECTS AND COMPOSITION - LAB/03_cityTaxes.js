function cityTaxes(name, population, treasury) {
  const city = {
    name: name,
    population: population,
    treasury: treasury,
    taxRate: 10,
    collectTaxes() {
      this.treasury += this.population * this.taxRate;
    },
    applyRecession(percent) {
      this.treasury -= Math.ceil(this.treasury * percent / 100);
    },
    applyGrowth(percent) {
      this.population += Math.floor(this.population * percent / 100);
    }
  }
  return city;
}



const result =
  cityTaxes('Tortuga',
    7000,
    15000);
console.log(result);
result.collectTaxes();
result.applyGrowth(5);
result.applyRecession(5);

