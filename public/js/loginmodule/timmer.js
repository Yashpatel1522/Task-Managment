const timer = (id, time) => {
	id = document.querySelector(`#${id}`);
	id.innerHTML = "";
	id.className = 'text-center text-danger';

	window.setInterval(() => {
		if (time >= 0)
			id.innerHTML = `Activation Time : ${time--}`;
		else {
			document.getElementById('error').style.display = 'none';
			id.remove();
		}
	}, 1000)
}