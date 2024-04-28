import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Buttons() { 

    return (
			<HStack justifyContent="center" spacing="32px">
				<Link to="/register">
					<Button
						w={200}
						bg="#A41E35"
						color="white"
						_hover={{
							background: "#b92841",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Хочу Допомогти
					</Button>
				</Link>

				<Link to="/register">
					<Button
						w={200}
						bg="#A41E35"
						color="white"
						_hover={{
							background: "#b92841",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Шукаю Допомогу
					</Button>
				</Link>
			</HStack>
		);
}

export default Buttons