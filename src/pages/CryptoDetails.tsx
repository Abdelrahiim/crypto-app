import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import {
	useGetCryptoCurrencyDetailsQuery,
	useGetCryptoHistoryQuery,
} from "../services/CryptoAPI";
import { HistoryData, IStats } from "../types";
import LineChart from "../components/LineChart";
import {Loader} from "../components";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams() as { coinId: string };
	const [timePeriod, setTimePeriod] = useState("7d");
	const { data, isFetching } = useGetCryptoCurrencyDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod: timePeriod,
	});
	if (isFetching) return <Loader />;
	const cryptoDetails = data?.data?.coin;
	const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y", "8y"];

	const stats: IStats[] = [
		{
			title: "Price to USD",
			value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
		{
			title: "24h Volume",
			value: `$ ${
				cryptoDetails["24hVolume"] &&
				millify(cryptoDetails["24hVolume"])
			}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: "Market Cap",
			value: `$ ${
				cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
			}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All-time-high(daily avg.)",
			value: `$ ${
				cryptoDetails?.allTimeHigh?.price &&
				millify(cryptoDetails?.allTimeHigh?.price)
			}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats: IStats[] = [
		{
			title: "Number Of Markets",
			value: cryptoDetails?.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: "Number Of Exchanges",
			value: cryptoDetails?.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: "Aprroved Supply",
			value: cryptoDetails?.supply?.confirmed ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Total Supply",
			value: `$ ${
				cryptoDetails?.supply?.total &&
				millify(cryptoDetails?.supply?.total)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${
				cryptoDetails?.supply?.circulating &&
				millify(cryptoDetails?.supply?.circulating)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	// Jsx
	return (
		<Col className="coin-detail-container">
			{/* Header */}
			<Col className="coin-heading-container">
				<Title className="coin-name" level={2}>
					{cryptoDetails.name} ({cryptoDetails.symbol}) Price
				</Title>
				<p>
					{cryptoDetails.name} live price in US Dollar (USD). View
					value statistics, market cap and supply.
				</p>
			</Col>

			{/** Select Component */}
			<Select
				defaultValue="7d"
				className="select-timeperiod"
				placeholder="Select Time Period"
				onChange={(value) => setTimePeriod(value)}
			>
				{time.map((date) => (
					<Option key={date}>{date}</Option>
				))}
			</Select>

			{/** Line Chart Separate Component */}
			<LineChart
				coinHistory={coinHistory as HistoryData}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			{/* Stats */}
			<Col className="stats-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							{cryptoDetails.name} Value Statistics
						</Title>
						<p>
							An overview showing the statistics of{" "}
							{cryptoDetails.name}, such as the base and quote
							currency, the rank, and trading volume.
						</p>
					</Col>
					{stats.map(({ icon, title, value }, index) => (
						<Col className="coin-stats" key={index}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>

				<Col className="other-stats-info">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							Other Statistics
						</Title>
						<p>
							An overview showing the statistics of all
							Cryptocurrencies
						</p>
					</Col>
					{genericStats.map(({ icon, title, value }, index) => (
						<Col className="coin-stats" key={index}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col>

			<Col className="coin-disc-link">
				<Row className="coin-disc">
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetails.name} ?
					</Title>
					<p style={{ fontSize: "1rem", opacity: ".9" }}>
						{cryptoDetails.description}
					</p>
				</Row>
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						{cryptoDetails.name} Links
					</Title>
					{cryptoDetails.links.map(
						(
							link: { name: string; type: string; url: string },
							index: number
						) => (
							<Row className="coin-link" key={index}>
								<Title level={5} className="link-name">
									{link.type}
								</Title>
								<a href={link.url} target="_blank">
									{link.name}
								</a>
							</Row>
						)
					)}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
