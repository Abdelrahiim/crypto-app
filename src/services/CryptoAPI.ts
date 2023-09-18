import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinData, HistoryData } from "../types";

const cryptoAPIHeaders = {
	'X-RapidAPI-Key': import.meta.env.VITE_CRYPTOAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_CRYPTOAPI_HOST
};

// console.log(import.meta.env.VITE_CRYPTOAPI_URL)
const baseUrl = import.meta.env.VITE_CRYPTOAPI_URL;

const createRequest = (url: string) => ({ url, headers: cryptoAPIHeaders });

export const cryptoAPI = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	endpoints: (builder) => ({
		getCryptoCurrency: builder.query<CoinData, string>({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoCurrencyDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),
		getCryptoHistory: builder.query<
			HistoryData,
			{ coinId: string; timePeriod: string }
		>({
			query: ({ coinId, timePeriod }) =>
				createRequest(
					`/coin/${coinId}/history?timePeriod=${timePeriod}`
				),
		}),
		// getExchanges: builder.query<ExchangesData,string>({
		// 	query: () => createRequest("/exchanges"),
		// }),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
	useGetCryptoCurrencyQuery,
	useGetCryptoCurrencyDetailsQuery,
	useGetCryptoHistoryQuery,
	
} = cryptoAPI;
