import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Activity from "./components/Activity/Activity";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exercise from "./components/Exercise/Exercise";
import Nutrition from "./components/Nutrition/Nutrition";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/Activity" element={<Activity />} />
						<Route path="/Exercise" element={<Exercise />} />
						<Route path="/Nutrition" element={<Nutrition />} />
					</Routes>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
