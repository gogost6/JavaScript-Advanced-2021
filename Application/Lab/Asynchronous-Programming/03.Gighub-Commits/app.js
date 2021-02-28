function loadCommits() {
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;
    const ul = document.getElementById("commits");

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(response => {
            if(response.status == 404) {
                const li = document.createElement('li');
                console.log(response);
                li.textContent = `Error: ${response.status} ${response.statusText}`;
                return ul.appendChild(li);
            } else {
                return response.json();
            }
        })
        .then(data => {
            data.forEach(x => {
                const li = document.createElement('li');
                li.textContent = `${x.commit.author.name}: ${x.commit.message}`;
                ul.appendChild(li);
            });
        }).catch((e) => {
            console.log(e);
        })
}