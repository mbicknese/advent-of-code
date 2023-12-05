import "./style.css";

const appElement = document.querySelector<HTMLDivElement>("#app");
appElement!.innerHTML = "<p>loading...</p>";
(async () => {
	switch (window.location.pathname) {
		case "/day/1":
			return (appElement!.innerHTML = (await import("./pages/day1.ts")).render());
		case "/day/2":
			return (appElement!.innerHTML = (await import("./pages/day2.ts")).render());
		case "/day/3":
			return (appElement!.innerHTML = (await import("./pages/day3.ts")).render());
		case "/day/4":
			return (appElement!.innerHTML = (await import("./pages/day4.ts")).render());
		default:
			appElement!.innerHTML = (await import("./pages/404.ts")).render();
	}
})();
