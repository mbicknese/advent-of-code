import input1 from "../inputs/day1.txt?raw";

const numbersAsText = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
} as const;
function isKeyOfNumbersAsText(key: string): key is keyof typeof numbersAsText {
	return key in numbersAsText;
}
function asNumber(input: string): number {
	if (Number.isNaN(Number(input))) {
		if (isKeyOfNumbersAsText(input)) {
			return numbersAsText[input];
		}
		console.error(input);
		throw new Error(`cannot parse "${input}"`);
	}
	return Number(input);
}

function solve1() {
	const lines = input1.split("\n");
	const numbers = lines.map((line) => {
		// Find all digits in the string
		const digits = [...line.matchAll(/\d{1}/g)];

		// Check if the string contains any digits
		if (digits.length === 0) {
			return 0;
		}

		const firstDigit = digits[0];
		const lastDigit = digits[digits.length - 1];

		// Return the resulting number
		return Number(`${firstDigit}${lastDigit}`);
	});
	return numbers.reduce((sum, number) => sum + number);
}

function solve2() {
	const lines = input1.split("\n");
	const numbers = lines.map((line) => {
		const findNumber = new RegExp(`(?=([0-9]{1}|${Object.keys(numbersAsText).join("|")}))`, "g");
		const digits = [...line.matchAll(findNumber)];

		// Check if the string contains any digits
		if (digits.length === 0) {
			return 0;
		}

		const firstDigit = asNumber(digits[0][1]);
		const lastDigit = asNumber(digits[digits.length - 1][1]);

		// Return the resulting number
		return Number(`${firstDigit}${lastDigit}`);
	});
	console.log(numbers);
	return numbers.reduce((sum, number) => sum + number);
}

export function render() {
	return `
		<h1>Day 1: Trebuchet?!</h1>
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
