import input2 from "../inputs/day2.txt?raw";

function solve1() {
	const valid = input2.matchAll(/^Game (\d+): (?:\d+ (?:(?:blue|red|green)(?<!(?:(?:[2-9][0-9]|1[5-9]) blue)|(?:(?:[2-9][0-9]|1[3-9]) red)|(?:(?:[2-9][0-9]|1[4-9]) green)))[,; ]*)+$/gm);

	return [...valid].map(([,game]) => Number(game)).reduce((a, b) => a + b);
}

function solve2() {
	const minimalColorsPerLine = input2.split("\n").filter(line => !!line)
		.map(line => [
			Math.max.apply(null, line.match(/\d+(?= red)/g)?.map(Number) ?? [0]),
			Math.max.apply(null, line.match(/\d+(?= green)/g)?.map(Number) ?? [0]),
			Math.max.apply(null, line.match(/\d+(?= blue)/g)?.map(Number) ?? [0])
		]);

	return minimalColorsPerLine
		.map(([red, green, blue]) => red * green * blue)
		.reduce((sum, game) => sum + game);
}

export function render() {
	return `
		<h1>Day 2: Cube Conundrum</h1>
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
