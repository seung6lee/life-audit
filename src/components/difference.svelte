<script>
	import { onMount } from 'svelte';

	const count = (li, n) => {
		return li.filter(item => item === n).length
	}


	let pp = 0; //Percentage point

	const yesterday_check = async () => {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);
		const today_text = today.toISOString().split('T')[0];
		const yesterday_text = yesterday.toISOString().split('T')[0];

		const raw_data = await fetch('/api');
		const json_data = await raw_data.json();
		const history = json_data.history;

		const todo_cnt = history[today_text].length;

		console.log(history[today_text])

		if (yesterday_text in history) {
			pp = ((count(history[today_text], true) - count(history[yesterday_text], true)) / todo_cnt) * 100;
		} else {
			pp = count(history[today_text], true) / todo_cnt * 100;
		}
	};

	onMount(yesterday_check);
</script>

<p>{pp}%pt</p>