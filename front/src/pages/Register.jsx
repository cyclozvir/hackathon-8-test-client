import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
	Link as ChakraLink,
	Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const location = useLocation();
	const { helper } =
		location.state !== null ? location.state : { helper: true };
	const navigate = useNavigate();

	useEffect(() => {
		const checkForCookie = () => {
			const cookies = document.cookie;
			return (
				cookies.includes("userRole=IN_NEED") && cookies.includes("userToken=")
			);
		};

		if (checkForCookie()) {
			navigate("/request-help");
		}
	}, [navigate]);

	useEffect(() => {
		const checkForCookie = () => {
			const cookies = document.cookie;
			return (
				cookies.includes("userRole=HELPER") && cookies.includes("userToken=")
			);
		};

		if (checkForCookie()) {
			navigate("/help-requests-list");
		}
	}, [navigate]);

	const onSubmit = async (formData) => {
		const { repeatPassword, ...formDataToSend } = formData;
		const registerEndpoint = helper
			? "https://dolphin-app-va5gv.ondigitalocean.app/api/v1/auth/register/helper"
			: "https://dolphin-app-va5gv.ondigitalocean.app/api/v1/auth/register/in-need";

		try {
			const response = await fetch(registerEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formDataToSend),
			});

			if (response.status === 409) {
				const errorData = await response.json();
				const errorMessage = errorData.message; // Assuming the error message is available in a 'message' field

				console.log("Registration Error Message:", errorMessage);

				alert(`Registration Error: ${errorMessage}`);
			} else {
				const data = await response.json();
				console.log("Registration Response:", data);

				const expirationTime = new Date();
				expirationTime.setTime(expirationTime.getTime() + 15 * 60 * 1000); // 15 minutes in milliseconds

				document.cookie = `userRole=${
					data.role
				}; expires=${expirationTime.toUTCString()}; path=/`;
				document.cookie = `userToken=${
					data.token
				}; expires=${expirationTime.toUTCString()}; path=/`;

				const redirectUrl =
					data.role == "HELPER" ? "/help-requests-list" : "/request-help";

				navigate(redirectUrl);
			}
		} catch (error) {
			console.error("Error registering user:", error);
			// Handle other types of errors (e.g., network issues)
			alert("Error registering user. Please try again later.");
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
			<Heading as="h2" size="lg" textAlign="center">
				Створити Аккаунт
			</Heading>
			<Text mb="8px" mt="4px" textAlign="center" fontStyle="italic">
				{helper ? "Хочу Допомогти" : "Шукаю Допомогу"}
			</Text>
			<></>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					<FormControl isRequired>
						<FormLabel htmlFor="firstName">First Name</FormLabel>
						<Input
							type="text"
							id="firstName"
							{...register("firstName", {
								required: "Please enter your first name",
							})}
							placeholder="Enter your first name"
						/>
						{errors.firstName && (
							<span style={{ color: "red" }}>{errors.firstName.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="lastName">Last Name</FormLabel>
						<Input
							type="text"
							id="lastName"
							{...register("lastName", {
								required: "Please enter your last name",
							})}
							placeholder="Enter your last name"
						/>
						{errors.lastName && (
							<span style={{ color: "red" }}>{errors.lastName.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							type="email"
							id="email"
							{...register("email", {
								required: "Please enter your email",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
							placeholder="Enter your email"
						/>
						{errors.email && (
							<span style={{ color: "red" }}>{errors.email.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input
							type="password"
							id="password"
							{...register("password", {
								required: "Please enter a password",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
							})}
							placeholder="Enter your password"
						/>
						{errors.password && (
							<span style={{ color: "red" }}>{errors.password.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
						<Input
							type="password"
							id="repeatPassword"
							{...register("repeatPassword", {
								required: "Please repeat your password",
								validate: (value) =>
									value === watch("password") || "Passwords do not match",
							})}
							placeholder="Repeat your password"
						/>
						{errors.repeatPassword && (
							<span style={{ color: "red" }}>
								{errors.repeatPassword.message}
							</span>
						)}
					</FormControl>
					<Button
						type="submit"
						bg="#A41E35"
						color="white"
						_hover={{
							background: "#b92841",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Зареєструватись
					</Button>
					<Box textAlign="center">
						<ChakraLink as={RouterLink} to="/login" color="blue.400" mt={3}>
							Already have an account? Login
						</ChakraLink>
					</Box>
				</Stack>
			</form>
		</Box>
	);
};

export default Register;
