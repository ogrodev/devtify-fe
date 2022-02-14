export const routeConfig = {
	login: { path: "", name: "Login" },
	home: { path: "home", name: "Home" },
	workshops: { path: "workshops", name: "Workshops" },
	news: { path: "news", name: "News" },
	openSource: { path: "open-source", name: "Open Source" },
	marketplace: { path: "marketplace", name: "Marketplace" },
	wallet: { path: "wallet", name: "My Wallet" },
};

export const menuRoutes = [
	{
		name: routeConfig.workshops.name,
		path: routeConfig.workshops.path,
	},
	{
		name: routeConfig.news.name,
		path: routeConfig.news.path,
	},
	{
		name: routeConfig.openSource.name,
		path: routeConfig.openSource.path,
	},
];
