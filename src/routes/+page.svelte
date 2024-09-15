<script>
	import Table from '../components/table.svelte';

    const digits = (n, l) => {
		return String(n).padStart(l, '0');
	};

	const today = new Date();
	const year = today.getFullYear(); // 년도
	const month = today.getMonth() + 1; // 월
	const date = today.getDate(); // 날짜
	const today_text = `${digits(year, 4)}-${digits(month, 2)}-${digits(date, 2)}`;
</script>

<main>
	<header>
		<h1>Life Audit</h1>
		<p>{today_text}</p>
	</header>
	<article>
		<Table />
	</article>
</main>

<style lang="scss">
	@import './style.scss';
</style>
