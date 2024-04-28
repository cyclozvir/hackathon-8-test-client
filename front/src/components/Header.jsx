import { Flex, Spacer } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Header() {
    return (
			<>
				<header>
					<Flex maxWidth="1280px" m="0 auto">
						<Link to="/">
							<Heading as="h1" size="xl">єПотреба</Heading>
						</Link>
					</Flex>
				</header>
			</>
		);
}

export default Header;
