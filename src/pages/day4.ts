import input from "../inputs/day4.txt?raw";

function solve1() {
	const cards = input
		.split("\n")
		.filter((line) => !!line)
		.map((line) => line.split(/: +/)[1])
		.map((line) => line.split(/ +\| +/))
		.map(([winning, own]) => [winning.split(/ +/), own.split(/ +/)]);

	const scores = cards
		.map(([winning, own]) => winning.filter((winner) => own.includes(winner)))
		.map((winners) => (winners.length > 0 ? Math.pow(2, winners.length - 1) : 0));

	return scores.reduce((sum, cur) => sum + cur);
}

function solve2() {
	const cards = input
		.split("\n")
		.filter((line) => !!line)
		.map((line) => line.split(/: +/)[1])
		.map((line) => line.split(/ +\| +/))
		.map(([winning, own]) => [winning.split(/ +/), own.split(/ +/)]);

	let copies = Array.from(Array(cards.length), () => 1);

	cards.forEach(([winning, own], card) => {
		const winCount = winning.filter((winner) => own.includes(winner)).length;
		if (winCount === 0) {
			return;
		}

		copies = [
			...copies.slice(0, card + 1),
			...copies.slice(card + 1, card + winCount + 1).map((count) => count + copies[card]),
			...copies.slice(card + winCount + 1),
		];
	});

	return copies.reduce((sum, cur) => sum + cur);
}

export function render() {
	return `
		<h1>Day 4: Scratchcards?!</h1>
		<section>
			<h2>Part One</h2>
			<p>${solve1()}</p>
		</section>

		<section>
			<h2>Part Two</h2>
			<p>${solve2()}</p>
		</section>
	`;
}
