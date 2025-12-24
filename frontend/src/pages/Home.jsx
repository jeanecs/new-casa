import { Hero } from '../components/Hero'; // Make sure the path to your Hero file is correct
import React from 'react';

const Home = () => {
	return (
		<div className="bg-background min-h-screen">
			{/* This uses your DM Serif Display font */}
            <Hero />
            
		</div>
	)
}

export default Home;
