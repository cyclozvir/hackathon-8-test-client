import './App.css'
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Register from './pages/Register.jsx';

function App() {

  return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	);
}

export default App
