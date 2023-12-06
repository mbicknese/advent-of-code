import input from "../inputs/day5.txt?raw";

const [, [seeds], ...sections] = input
	.split(/.*: {0,1}/gm)
	.map((textBlock) => textBlock.split("\n"))
	.map((lines) => lines.filter((line) => !!line))
	.map((lines) => lines.map((line) => line.split(" ").map((number) => Number(number))));

// Fun test but running this code stalls execution. Left here for your entertainment.
function createMapping(raws: [number, number, number][]) {
	return raws.reduce(
		(acc, [dest, source, length]) => ({
			...acc,
			...Object.fromEntries(Array.from(Array(length), (_, i) => [source + i, dest + i])),
		}),
		{},
	);
}

function solve1() {
	const locations = seeds
		.map((seed) =>
			sections.reduce(
				(chain, section, i) => [
					...chain,
					section
						.find((mapping) => chain[i] >= mapping[1] && chain[i] < mapping[1] + mapping[2])
						?.reduce((_, __, ___, mapping) => mapping[0] + (chain[i] - mapping[1])) ?? chain[i],
				],
				[seed],
			),
		)
		.map((combination) => combination[combination.length - 1]);

	return locations.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1))[0];
}

function solve2() {
	return "wip";
}

export function render() {
	return `
		<h1>Day 5: If You Give A Seed A Fertilizer</h1>
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
