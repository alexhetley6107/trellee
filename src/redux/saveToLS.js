export default function (boards) {
	const json = JSON.stringify(boards);

	localStorage.setItem('boards', json);
}
