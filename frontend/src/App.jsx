import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Villas from './pages/Villas'; // Import your new page

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
                        <Route path="/villas" element={<Villas />} />
						{/* We will add your Admin route here later */}
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
