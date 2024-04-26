import './App.css'
import Buttons from './components/Buttons';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {

  return (
		<>
			<Header />
			<section className='container'>
        <Hero />
        <Buttons/>
			</section>
		</>
	);
}

export default App
