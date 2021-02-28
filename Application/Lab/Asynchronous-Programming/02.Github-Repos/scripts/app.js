function loadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const ul = document.getElementById('repos');
			ul.innerHTML = '';
			data.forEach(r => {
				const liElement = document.createElement('li');
				const aElement = document.createElement('a');
				aElement.href = r.html_url;
				aElement.textContent = r.full_name;
				liElement.appendChild(aElement);
				ul.appendChild(liElement);
			})
		});
}