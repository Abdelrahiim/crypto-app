import { Outlet } from "react-router-dom";
import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
	return (
		<div className="app">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<Outlet />
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: "white", textAlign: "center" }}
					>
						Cryptoverse <br />
						All rights reserves
					</Typography.Title>
					<Space>
						<Link to="/"> Home</Link>
						<Link to="/exchanges"> Exchanges</Link>
						<Link to="/news"> Home</Link>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default Layout;
