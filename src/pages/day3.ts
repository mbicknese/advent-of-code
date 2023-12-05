import input from "../inputs/day3.txt?raw";

/**
 * Calculates the distance between two points, each horizontal, vertical or diagonal move is counted as 1
 *
 * The first arguments value will be used as size and distance is calculated for all edges, the shortest
 * distance is returned.
 */
function distance(a: { x: number; y: number; value: string }, b: { x: number; y: number }): number {
	const distances = Array.from(Array(a.value.length), (_, offset) =>
		Math.max(Math.abs(a.x + offset - b.x), Math.abs(a.y - b.y)),
	);

	return Math.min(...distances);
}

async function solve1() {
	document.querySelector("#part1")!.innerHTML = "<p>calculating</p>";
	const numbers: { x: number; y: number; value: string; isPart?: boolean }[] = [];
	const symbols: { x: number; y: number }[] = [];
	let inNumber = false;
	input.split("\n").forEach((line, y) =>
		line.split("").forEach((char, x) => {
			if (/[0-9]/.test(char)) {
				if (inNumber) {
					numbers[numbers.length - 1].value += char;
				} else {
					numbers.push({ x, y, value: char });
					inNumber = true;
				}
			} else {
				inNumber = false;
				if (char !== ".") {
					symbols.push({ x, y });
				}
			}
		}),
	);

	const partNumbers = numbers.map((number) => ({
		...number,
		isPart: symbols.reduce((prev, symbol) => distance(number, symbol) === 1 || prev, false),
	}));

	const debug = false;
	if (debug) {
		document.querySelector("#part1")!.innerHTML = `
			<ul>
			${partNumbers.map(({ x, y, value, isPart }) => `<li>${x}, ${y}: ${value} ${isPart ? "*" : ""}</li>`).join("")}
			</ul>
		`;
	} else {
		const sum = partNumbers.filter(({ isPart }) => isPart).reduce((sum, { value }) => sum + Number(value), 0);
		document.querySelector("#part1")!.innerHTML = `
			<p>${sum}</p>
		`;
	}
}

function solve2() {
	const numbers: { x: number; y: number; value: string }[] = [];
	const symbols: { x: number; y: number; gears: string[] }[] = [];
	let inNumber = false;
	input.split("\n").forEach((line, y) =>
		line.split("").forEach((char, x) => {
			if (/[0-9]/.test(char)) {
				if (inNumber) {
					numbers[numbers.length - 1].value += char;
				} else {
					numbers.push({ x, y, value: char });
					inNumber = true;
				}
			} else {
				inNumber = false;
				if (char === "*") {
					symbols.push({ x, y, gears: [] });
				}
			}
		}),
	);

	const ratios = symbols
		.map((symbol) => ({
			...symbol,
			gears: numbers.filter((number) => distance(number, symbol) === 1).map(({ value }) => value),
		}))
		.filter(({ gears }) => gears.length === 2)
		.map(({ gears }) => Number(gears[0]) * Number(gears[1]));

	return ratios.reduce((sum, cur) => sum + cur, 0);
}

export function render() {
	queueMicrotask(solve1);
	return `
		<h1>Day 3: Gear Ratios</h1>
		<section>
			<h2>Part One</h2>
			<div id="part1" />
		</section>
		<section>
			<h2>Part Two</h2>
			<p>${solve2()}</p>
		</section>
	`;
}
