import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
	Textarea,
	Select
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getJwtTokenFromCookie } from "../utils/utils";

function RequestHelp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [tagsOptions, setTagsOptions] = useState([]);
	const [categoriesOptions, setCategoriesOptions] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const checkForCookie = () => {
			const cookies = document.cookie;
			return (
				cookies.includes("userRole=IN_NEED") && cookies.includes("userToken=")
			);
		};

		if (!checkForCookie()) {
			navigate("/");
		}
	}, [navigate]);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await fetch(
					"https://lionfish-app-cwlbq.ondigitalocean.app/api/v1/tags"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch tags");
				}
				const data = await response.json();
				const options = data.map((tag) => ({ value: tag.id, label: tag.name }));
				setTagsOptions(options);
			} catch (error) {
				console.error("Error fetching tags:", error);
			}
		};

		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"https://lionfish-app-cwlbq.ondigitalocean.app/api/v1/categories"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch categories");
				}
				const data = await response.json();
				const options = data.map((category) => ({
					value: category.id,
					label: category.name,
				}));
				setCategoriesOptions(options);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchTags();
		fetchCategories();
	}, []);

	const onSubmit = async (formData) => {
		console.log(formData);
		const token = getJwtTokenFromCookie();
		try {
			const response = await fetch(
				"https://lionfish-app-cwlbq.ondigitalocean.app/api/v1/events",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const data = await response.text();
				console.log("Create Response:", data);
				// Reset the form after successful submission
				alert('Help Requaest created!!!');
				reset();
				// Optionally perform other actions (e.g., show success message)
			} else if (response.status === 409) {
				const errorData = await response.json();
				const errorMessage = errorData.message; // Assuming the error message is available in a 'message' field
				console.log("Create Error Message:", errorMessage);
				alert(`Create Error: ${errorMessage}`);
			} else {
				throw new Error("Failed to create event");
			}
		} catch (error) {
			console.error("Error Create :", error);
			alert("Error Create. Please try again later.");
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					<FormControl isRequired>
						<FormLabel htmlFor="title">Title</FormLabel>
						<Input
							type="text"
							id="title"
							{...register("title", { required: "Please enter the title" })}
							placeholder="Enter the title"
						/>
						{errors.title && (
							<span style={{ color: "red" }}>{errors.title.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="tags">Tags</FormLabel>
						<Select id="tags" {...register("tagIds.0", {valueAsNumber: true,})}>
							{tagsOptions.map((option) => (
								<option key={option.value} value={ option.value }>
									{option.label}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="categories">Categories</FormLabel>
						<Select id="categories" {...register("categoryIds.0", {valueAsNumber: true,})}>
							{categoriesOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="description">Description</FormLabel>
						<Textarea
							id="description"
							{...register("description", {
								required: "Please enter the description",
							})}
							placeholder="Enter the description"
						/>
						{errors.description && (
							<span style={{ color: "red" }}>{errors.description.message}</span>
						)}
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="date">Date</FormLabel>
						<Input type="date" id="date" {...register("deadline")} />
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="place">Place</FormLabel>
						<Input
							type="text"
							id="place"
							{...register("location")}
							placeholder="Enter the place"
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="details">Details</FormLabel>
						<Input
							type="text"
							id="details"
							{...register("recipientDetails")}
							placeholder="Enter the details"
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="contact">Contact</FormLabel>
						<Textarea
							id="contact"
							{...register("contactDetails")}
							placeholder="Enter contact information"
						/>
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
						Submit
					</Button>
				</Stack>
			</form>
		</Box>
	);
}

export default RequestHelp;