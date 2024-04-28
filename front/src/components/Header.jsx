import { useEffect, useState } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();
	const [logout, setLogout] = useState(false);
	useEffect(() => {
		const checkForCookie = () => {
			const cookies = document.cookie;
			return cookies.includes("userRole=") && cookies.includes("userToken=");
		};

		if (checkForCookie()) {
			setLogout(true);
		}
	}, [setLogout]);

		function logoutFunc(){ 
			document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			navigate("/");
		}
	

	return (
		<>
			<header>
				<Flex maxWidth="1280px" m="0 auto">
					<Link to="/">
						<Heading as="h1" size="xl">
							єПотреба
						</Heading>
					</Link>
					<Spacer />
					{logout ? <Button onClick={ logoutFunc}>LogOut</Button> : ''}
				</Flex>
			</header>
		</>
	);
}

export default Header;
