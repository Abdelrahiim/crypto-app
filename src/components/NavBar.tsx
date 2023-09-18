import { Typography, Menu, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import icon from "../assets/images/cryptocurrency.png";
import {
	HomeOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd/es/menu";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem(<Link to="/">Home</Link>, "2", <HomeOutlined />),
	getItem(
		<Link to="/cryptocurrencies">CryptoCurrencies</Link>,
		"3",
		<FundOutlined />
	),
	
	getItem(<Link to="/news">News</Link>, "5", <BulbOutlined />),
];

/**
 *  Navbar Component
 * @returns JSX.ELEMENT
 */
const NavBar = () => {
	const [activeMenu, setActiveMenu] = useState<boolean>(true);
	const [screenSize, setScreenSize] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (Number(screenSize) <= 800) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={icon} size="large" />
				<Typography.Title level={2} className="logo">
					<Link to="/">Crypto Verse </Link>
				</Typography.Title>
				<Button
					className="menu-control-container"
					onClick={() => setActiveMenu(!activeMenu)}
				>
					<MenuOutlined />
				</Button>
			</div>
			{activeMenu && <Menu theme="dark" items={items} />}
		</div>
	);
};

export default NavBar;
