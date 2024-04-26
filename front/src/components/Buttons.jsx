import { Button, HStack } from "@chakra-ui/react";

function Buttons() { 

    return (
			<HStack justifyContent="center" spacing="32px">
				<Button
					as="a"
					href="/"
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
				<Button
					as="a"
					href="/"
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
			</HStack>
		);
}

export default Buttons