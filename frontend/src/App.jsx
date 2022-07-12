import * as React from "react";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Activity from "./components/Activity/Activity";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exercise from "./components/Exercise/Exercise";
import Nutrition from "./components/Nutrition/Nutrition";
import Sleep from "./components/Sleep/Sleep";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/Activity" element={<Activity />} />
						<Route path="/Exercise" element={<Exercise />} />
						<Route path="/Nutrition" element={<Nutrition />} />
						<Route path="/Sleep" element={<Sleep />} />
						<Route
							path="/Login"
							element={
								<LoginForm
									email={email}
									setEmail={setEmail}
									password={password}
									setPassword={setPassword}
								/>
							}
						/>
						<Route path="/Register" element={<RegisterForm />} />
					</Routes>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
