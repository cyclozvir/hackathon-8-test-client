import Hero from "../components/Hero";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<section className="container">
				<Hero />
				<Buttons />
			</section>
		</>
	);
}

export default Home;
