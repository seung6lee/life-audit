<script>
	import { onMount } from 'svelte';
	import Difference from '../components/difference.svelte';
	// export let name = 'World'; // 부모 컴포넌트에서 전달받는 props

	const history_check = async () => {
		const raw_data = await fetch('/api');
		const json_data = await raw_data.json();
		todo = json_data.todo;

		if (today_text in json_data.history) {
			is_done = json_data.history[today_text];
		} else {
			await fetch('/api/novel', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: today_text
				})
			});
		}
	};

	const digits = (n, l) => {
		return String(n).padStart(l, '0');
	};

	let unique = {} // every {} is unique, {} === {} evaluates to false
	function restart() {
		unique = {};
	}

	const toggle = async () => {
		fetch('/api/toggle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: today_text,
				index: event.target.name,
				bool: event.target.checked
			})
		});

		restart()
	};

	const today = new Date();
	const year = today.getFullYear(); // 년도
	const month = today.getMonth() + 1; // 월
	const date = today.getDate(); // 날짜
	const today_text = `${digits(year, 4)}-${digits(month, 2)}-${digits(date, 2)}`;

	let todo = [];
	let is_done = [];

	onMount(history_check);
</script>

<table>
	<tr>
		<th>Todo</th>
		<th>Time</th>
		<th>Progress</th>
	</tr>
	{#each todo as element, i}
		<tr>
			<td>{element[0]}</td>
			<td>{digits(element[1][1], 2)}:{digits(element[1][1], 2)}</td>
			<td>
				<input type="checkbox" name={i} checked={is_done[i]} on:change={toggle} />
			</td>
		</tr>
	{/each}
</table>

{#key unique}
	<Difference />
{/key}
