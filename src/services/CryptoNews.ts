import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const newsAPIHeaders = {
	"X-BingApis-SDK": import.meta.env.VITE_CRYPTOAPI_NEWS_SDK,
	"X-RapidAPI-Key": import.meta.env.VITE_CRYPTOAPI_NEWS_KEY,
	"X-RapidAPI-Host": import.meta.env.VITE_CRYPTOAPI_NEWS_HOST,
};

const baseUrl = import.meta.env.VITE_CRYPTOAPI_NEWS_URL
const createRequest = (url: string) => ({ url, headers: newsAPIHeaders });

export const cryptoNewsAPI = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	endpoints: (builder) => ({
		getCryptoNews: builder.query<{value:[]},{newsCategory:string,count:string}>({
			query: ({ newsCategory, count }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				),
		}),
	}),
});


export const { useGetCryptoNewsQuery } = cryptoNewsAPI;
