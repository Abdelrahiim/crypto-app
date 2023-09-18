import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptoCurrencyQuery } from "../services/CryptoAPI";
import { useState, useEffect } from "react";
import { Coins } from "../types";
import Loader from "../components/Loader";

/**
 * Crypto Currency Page
 * @param simplified?: boolean
 * @returns
 */
const CryptoPage = ({ simplified }: { simplified?: boolean }) => {
	const count: string = simplified ? "10" : "100";

	const { data: cryptoList, isFetching } = useGetCryptoCurrencyQuery(count);
	const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		setCryptos(cryptoList?.data?.coins);
		const filteredDate = cryptoList?.data?.coins?.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm?.toLowerCase())
		);

		setCryptos(filteredDate);
	}, [cryptoList, searchTerm]);

	if (isFetching) {
		return <Loader />;
	}

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Crypto Currency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((currency: Coins) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={currency.uuid}
					>
						{/* Note: Change currency.id to currency.uuid  */}
						<Link
							key={currency.uuid}
							to={`/crypto/${currency.uuid}`}
						>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										className="crypto-image"
										src={currency.iconUrl}
									/>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Market Cap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {currency.change}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default CryptoPage;
