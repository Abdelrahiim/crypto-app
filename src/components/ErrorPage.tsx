import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom";

interface ErrorMsg {
	error: string;
}

const ErrorPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const e = useRouteError() as AxiosError<ErrorMsg>;

	return (
		<>
			<h1>An error occurred! {e.response?.data.error} </h1>
			<pre>
				{e.response?.status} - {e.response?.statusText}
			</pre>
		</>
	);
};

export default ErrorPage;
