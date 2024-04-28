
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
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
	const {
		register,
		handleSubmit,
        formState: { errors },
        reset
	} = useForm();

	const navigate = useNavigate();


	const onSubmit = async (formData) => {
		try {
			const response = await fetch(registerEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.status === 409) {
				const errorData = await response.json();
				const errorMessage = errorData.message; // Assuming the error message is available in a 'message' field

				console.log("Login Error Message:", errorMessage);

                alert(`Login Error: ${errorMessage}`);
                reset();
			} else {
				const data = await response.json();
				console.log("Login Response:", data);

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
			console.error("Error login user:", error);
			// Handle other types of errors (e.g., network issues)
			alert("Error login user. Please try again later.");
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
			<Heading as="h2" size="lg" textAlign="center">
				Увійти
			</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
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
						Увійти
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default Login;
