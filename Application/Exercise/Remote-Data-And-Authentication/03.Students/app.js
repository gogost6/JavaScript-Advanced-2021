const tbody = document.getElementById('tbody');
async function getStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const responce = await fetch(url);
    const data = await responce.json();
    Object.values(data).forEach(x => {
        dom(x);
    });
    document.getElementById('results').appendChild(document.createElement('tfoot'));
}
getStudents();

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    newStudent();
})


async function newStudent() {
    let obj = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        facultyNumber: document.getElementById('facultyNumber').value,
        grade: Number(document.getElementById('grade').value)
    };
    if(Object.values(obj).every(x => x != '' || 'null')) {
        postData(obj);
        tbody.innerHTML = '';
        getStudents();
    } else {
        return;
    }
}

async function postData(data) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            facultyNumber: data.facultyNumber,
            grade: data.grade
        })
    });
}

function dom(x) {
    const tr = document.createElement('tr');
    const firstName = createEl('th', x.firstName);
    const lastName = createEl('th', x.lastName);
    const facultyNumber = createEl('th', x.facultyNumber);
    const grade = createEl('th', x.grade);
    tr.append(firstName, lastName, facultyNumber, grade);
    tbody.appendChild(tr);
}

function createEl(type, textContent) {
    let element = document.createElement(type);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}