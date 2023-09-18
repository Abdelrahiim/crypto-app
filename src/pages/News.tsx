/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Select, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/CryptoNews";
import { useState } from "react";
import { useGetCryptoCurrencyQuery } from "../services/CryptoAPI";
import { Loader } from "../components";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
	"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

/**
 *  News Component
 * @param param0
 * @returns
 */
const News = ({ simplified }: { simplified?: boolean }) => {
	const [newsCategory, setNewsCategory] = useState("Cryptocurrencies");
	const { data } = useGetCryptoCurrencyQuery("100");
	const { data: cryptoList } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? "6" : "12",
	});

	if (!cryptoList?.value) return <Loader />;

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select A Crypto"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option: any) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any 
							option?.children?.indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{data?.data?.coins?.map((coin) => (
							<Option key={coin.uuid} value={coin.name}>
								{coin.name}
							</Option>
						))}
					</Select>
				</Col>
			)}
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			{cryptoList.value.map((news: any, index) => (
				<Col xs={24} md={12} lg={8} key={index + 1}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={5}>
									{news.name}
								</Title>
								<img
									style={{ maxWidth: "200px" }}
									src={
										news?.image?.thumbnail?.contentUrl ||
										demoImage
									}
									alt=""
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail
												?.contentUrl || demoImage
										}
										alt=""
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished)
										.startOf("s")
										.fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
