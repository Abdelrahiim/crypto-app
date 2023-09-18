import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptoCurrencyQuery } from "../services/CryptoAPI";
import { Stats } from "../types";
import { CryptoPage, News } from ".";
import Loader from "../components/Loader";
const { Title } = Typography;

/**
 *
 * Home Page Componant
 * @returns Jsx.Element
 */
const HomePage = () => {
	const { data, isFetching } = useGetCryptoCurrencyQuery("10");

	if (isFetching) {
		return <Loader />;
	}

	const globalStatus = data?.data?.stats as Stats;
	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title="Total Cryptocurrencies"
						value={globalStatus.total}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={millify(globalStatus.totalExchanges)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market Cap"
						value={millify(Number(globalStatus.totalMarketCap))}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24h Volume"
						value={millify(Number(globalStatus.total24hVolume))}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Markets"
						value={millify(globalStatus.totalMarkets)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 CryptoCurrencies in The World
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies"> Show More </Link>
				</Title>
			</div>
			{/** Simplified Version of Crypto Page */}
			<CryptoPage simplified />

			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest Crypto News
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news"> Show More </Link>
				</Title>
			</div>
			{/** Simplified Version of News Page */}
			<News simplified />
		</>
	);
};

export default HomePage;
