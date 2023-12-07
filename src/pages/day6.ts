import input from "../inputs/day6.txt?raw";

// Not the most elegant, but sure gets there without too much memory usage
function solve1() {
	const times = [...input.split("\n")[0].matchAll(/\d+/g)].map((time) => Number(time));
	const distances = [...input.split("\n")[1].matchAll(/\d+/g)].map((distance) => Number(distance));
	const wins = times.map((time, race) => {
		const low = (() => {
			for (let i = 1; i < time; ++i) {
				if (distances[race] < i * (time - i)) {
					return i;
				}
			}
			return 0;
		})();
		const high = (() => {
			for (let i = time - 1; i > 0; --i) {
				if (distances[race] < i * (time - i)) {
					return i;
				}
			}
			return 0;
		})();
		return high - low + 1;
	});
	return wins.reduce((product, cur) => product * cur);
}

function solve2() {
	const time = Number([...input.split("\n")[0].matchAll(/\d+/g)].join(""));
	const distance = Number([...input.split("\n")[1].matchAll(/\d+/g)].join(""));

	const low = (() => {
		for (let i = 1; i < time; ++i) {
			if (distance < i * (time - i)) {
				return i;
			}
		}
		return 0;
	})();
	const high = (() => {
		for (let i = time - 1; i > 0; --i) {
			if (distance < i * (time - i)) {
				return i;
			}
		}
		return 0;
	})();

	return high - low + 1;
}

export function render() {
	return `
		<h1>Day 6: Wait For It</h1>
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
