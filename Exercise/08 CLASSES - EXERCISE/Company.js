class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        const isValid = (x) => x != '' || x != undefined || x != null || x >= 0;
        if ([username, salary, position, department].every(isValid)) {
            if(!this.departments[department]) {
                this.departments[department] = {};
            }
            this.departments[department][username] = [salary , position, department];
            return `New employee is hired. Name: ${username}. Position: ${position}`;
        } else {
            throw new Error("Invalid input!");
        }
    }

    bestDepartment() {
        let best=Object.entries(this.departments).sort((a , b)=> {
            return Object.values(b[1])[0][0] - Object.values(a[1])[0][0];
        })[0]
        let avg=Object.values(best[1]).map(x=> x[0]).reduce((a , b)=> a + b,0) / Object.values(best[1]).length;
        let employees=[]
        Object.entries(best[1]).sort((a , b)=> {
            return b[1][0] - a[1][0] || a[0].localeCompare(b[0]);
        }).forEach(x=> {
            employees.push(`${x[0]} ${x[1][0]} ${x[1][1]}`);
        })
        return `Best Department is: ${best[0]}\nAverage salary: ${avg.toFixed(2)}\n${employees.join("\n")}`;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

