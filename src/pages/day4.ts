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
	return "wip";
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
