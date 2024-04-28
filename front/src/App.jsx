import './App.css'
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import RequestHelp from './pages/RequestHelp.jsx';
import HelpList from './pages/HelpList.jsx';

function App() {

  return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/request-help" element={<RequestHelp />} />
				<Route path="/help-requests-list" element={<HelpList />} />
			</Routes>
		</>
	);
}

export default App
