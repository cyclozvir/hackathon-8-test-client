import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJwtTokenFromCookie } from "../utils/utils"
import {
	Card,
	CardBody,
	CardFooter,
	HStack,
	Stack,
	Heading,
	Text,
	Divider,
	Button,
	Image
} from "@chakra-ui/react";

function HelpList() {
	const navigate = useNavigate();
	const [events, setEvents] = useState(null);

	useEffect(() => {
		const checkForCookie = () => {
			const cookies = document.cookie;
			return (
				cookies.includes("userRole=HELPER") && cookies.includes("userToken=")
			);
		};

		if (!checkForCookie()) {
			navigate("/");
		}
	}, [navigate]);

	const fetchImage = async () => {
		const token = getJwtTokenFromCookie();
		if (token) {
			try {
				const response = await fetch(
					"https://lionfish-app-cwlbq.ondigitalocean.app/api/v1/images/13",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const imageBlob = await response.blob();
					const imageURL = URL.createObjectURL(imageBlob);
					return imageURL; 
				} else {
					throw new Error("Failed to fetch image");
				}
			} catch (error) {
				console.error("Error fetching image:", error);
				return null; 
			}
		}
		return null; 
	};

	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const fetchAndSetImage = async () => {
			const url = await fetchImage(); 
			setImageUrl(url);
		};

		fetchAndSetImage();
	}, []); 

	useEffect(() => {
		const fetchEvents = async () => {
			const token = getJwtTokenFromCookie();
			console.log(token);
			if (token) {
				try {
					const response = await fetch(
						"https://lionfish-app-cwlbq.ondigitalocean.app/api/v1/events",
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);

					if (response.ok) {
						const eventsList = await response.json();
						setEvents(eventsList);
					} else {
						throw new Error("Failed to fetch user data");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchEvents();
	}, []);

	return (
		<>
			<section className="container">
				<HStack spacing="16px" flexWrap="wrap">
					{events ? (
						events.map((item) => (
							<Card
								key={item.id}
								maxW="sm"
								shadow="none"
								borderWidth={1}
								borderRadius="md"
								borderColor="#E2E8F0"
							>
								<CardBody>
									<Image
										src={imageUrl}
										alt="Green double couch with wooden legs"
										borderRadius="lg"
									/>
									<Stack mt="6" spacing="3">
										<Heading size="md">{item.title}</Heading>
										<Text>
											{item.description.length <= 100
												? item.description
												: `${item.description.substring(0, 100).trim()}...`}
										</Text>

										{item.deadline ? (
											<Text>
												<b>Виконати До:</b> {item.deadline}
											</Text>
										) : null}

										{item.created_at ? (
											<Text>
												<b>Створено:</b> {item.created_at}
											</Text>
										) : null}
									</Stack>
								</CardBody>
								<Divider />
								<CardFooter>
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
										Детальніше
									</Button>
								</CardFooter>
							</Card>
						))
					) : (
						<p>Loading user data...</p>
					)}
				</HStack>
			</section>
		</>
	);
}

export default HelpList;
