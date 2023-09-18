import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, Layout } from "./components";
import { HomePage, CryptoPage, CryptoDetails, News } from "./pages";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import NotFound404Element from "./pages/NotFound404Element";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
				errorElement: <ErrorPage />,
			},

			{
				path: "cryptocurrencies",
				element: <CryptoPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "crypto/:coinId",
				element: <CryptoDetails />,
				errorElement: <ErrorPage />,
			},
			{
				path: "news",
				element: <News />,
				errorElement: <ErrorPage />,
			},
			{
				path: "*",
				element: <NotFound404Element />,
			},
		],
	},
]);

const App = () => {
	
	return <RouterProvider router={router} />;
};

export default App;
