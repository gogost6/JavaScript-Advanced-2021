async function lockedProfile() {
    const main = document.querySelector('main');
    let other = main.cloneNode(true);
    const container = document.getElementById('container');
    console.log(other);
    const responce = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await responce.json();
    console.log(Object.values(data));
    Object.values(data).forEach(x => {
        other.lastElementChild.children[8].value = x.username;
        other.lastElementChild.children[9].children[2].value = x.email;
        other.lastElementChild.children[9].children[4].value = x.age;
        container.appendChild(other);
        other = main.cloneNode(true);
    })
    
    container.addEventListener('click', function(e) {
        if(e.target.tagName == 'BUTTON') {
            const profile = e.target.parentNode;
            console.log(profile);
            if(profile.children[4].checked) {
                if(profile.children[9].style.display == 'block') {
                    profile.children[9].style.display = 'none';
                } else {
                    profile.children[9].style.display = 'block';
                }
            } 
        }
    })
}