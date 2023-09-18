export interface Stats {
	total: number;
	total24hVolume: string;
	totalCoins: number;
	totalExchanges: number;
	totalMarketCap: string;
	totalMarkets: number;
}
export interface Coins {
	uuid: string;
	symbol: string;
	name: string;
	color: string;
	iconUrl: string;
	marketCap: number;
	price: number;
	btcPrice: number;
	listedAt: number;
	change: number;
	rank: number;
}
export interface CoinData {
	data?: { coins?: Coins[]; stats: Stats };
}

export interface IStats {
	title: string;
	value: string;
	icon: JSX.Element;
}

export interface History {
	price: number;
	timestamp: number;
}

export interface HistoryData {
	data: {
		change: string;
		history: History[];
	};
}

// export interface Exchange {
// 	uuid: string;
// 	name: string;
// 	iconUrl: string;
// 	verified: false;
// 	recommended: true;
// 	numberOfMarkets: number;
// 	coinrankingUrl: string;
// 	btcPrice: string;
// 	rank: number;
// 	"24hVolume": string;
// 	price: string;
// }
// export interface ExchangesData {
// 	data: {
// 		stats: {
// 			"24hVolume": string;
// 			total: number;
// 		};
// 		exchanges:Exchange[]
// 	};
// }
