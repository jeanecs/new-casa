import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 opacity-90">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo / Site name */}
					<div className="flex items-center space-x-8">
						<Link to="/">
							<img
								src="/Casa Filomena Logo-Black.svg"
								alt="Casa Filomena Logo"
								className="h-16 w-auto"
							/>
						</Link>
						<nav className="hidden md:flex space-x-6">
							<Link to="/villas" className="text-gray-700 hover:text-gray-900 transition-colors">
								Villas
							</Link>
							<a href="#bulletin" className="text-gray-700 hover:text-gray-900 transition-colors">
								Bulletin
							</a>
							<Link to="/location" className="text-gray-700 hover:text-gray-900 transition-colors">
								Our Location
							</Link>
						</nav>
					</div>
					{/* Contact Us Button */}
					<div>
						<Link to="/location">
							<button className="bg-yellow-800 text-white text-md px-4 py-1 rounded-[2px] hover:bg-yellow-900 transition-colors font-medium shadow-xl">
								Contact Us
							</button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
