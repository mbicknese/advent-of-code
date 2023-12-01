import "./style.css";

const appElement = document.querySelector<HTMLDivElement>("#app");
appElement!.innerHTML = "<p>loading...</p>";
(async () => {
	switch (window.location.pathname) {
		case "/day/1":
			return (appElement!.innerHTML = (await import("./pages/day1.ts")).render());
		default:
			appElement!.innerHTML = (await import("./pages/404.ts")).render();
	}
})();
