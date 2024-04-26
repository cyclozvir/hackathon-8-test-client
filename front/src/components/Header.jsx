import { Flex, Spacer } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'

function Header() {
    return (
			<>
				<header>
					<Flex maxWidth="1280px" m="0 auto">
						<Heading size="xl">єПотреба</Heading>
					</Flex>
				</header>
			</>
		);
}

export default Header;
