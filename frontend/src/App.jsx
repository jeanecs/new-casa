import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="font-gideon text-gray-900">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route 
							path="/" 
							element={<Home />} 
						/>
						{/* We will add your Admin route here later */}
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
