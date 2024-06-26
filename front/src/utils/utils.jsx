
export const getJwtTokenFromCookie = () => {
	const cookie = document.cookie
		.split("; ")
		.find((row) => row.startsWith("userToken="));

	if (cookie) {
		return cookie.split("=")[1];
	}

	return null;
};