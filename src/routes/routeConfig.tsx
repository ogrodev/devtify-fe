export const routeConfig = {
	login: { path: "/", name: "Login" },
	home: { path: "/home", name: "Home" },
	workshops: { path: "/workshops", name: "Workshops" },
	workshop: { path: "/workshop/:id", name: "Workshop" },
	news: { path: "/news", name: "News" },
	openSource: { path: "/open-source", name: "Open Source" },
	marketplace: { path: "/marketplace", name: "Marketplace" },
	wallet: { path: "/wallet", name: "My Wallet" },
};

export const menuRoutes = [
	{
		name: routeConfig.workshops.name,
		path: routeConfig.workshops.path,
	},
];
