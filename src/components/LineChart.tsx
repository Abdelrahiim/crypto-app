import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import { HistoryData } from "../types";
import date from 'date-and-time'

const {  Title } = Typography;
const LineChart = ({
	coinHistory,
	currentPrice,
	coinName,
}: {
	coinHistory: HistoryData;
	currentPrice: string;
	coinName: string;
}) => {
	const coinPrice: number[] = [];
	const coinTimestamp: string[] = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory?.data?.history[i].price);
		coinTimestamp.push(
			date.format(new Date(
				coinHistory?.data?.history[i].timestamp * 1000
			),"ddd, MMM DD YY HH:mm ")
		);
	}

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: "Price In USD",
				data: coinPrice,
				fill: false,
				backgroundColor: "#0071bd",
				borderColor: "#0071bd",
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
      y: {
          stacked: true,
      }
  }
	};
	return (
		<>
			<Row className="chart-header">
				<Title level={2} className="chart-title">
					{coinName} Price Chart{" "}
				</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">
						Change: {coinHistory?.data?.change}%
					</Title>
					<Title level={5} className="current-price">
						Current {coinName} Price: $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line
				data={data}
				options={options}
			/>
		</>
	);
};

export default LineChart;
