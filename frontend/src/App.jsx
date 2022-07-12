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
import Axios from "axios";

const URL_BASE = "http://localhost:3001/";

function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [thisUser, setThisUser] = React.useState(null);

	async function loginPostReq(email, password) {
		const LOGIN_URL = URL_BASE + "auth/login";
		const login_user = await { email: email, password: password };

		console.log(login_user);
		Axios.post(LOGIN_URL, login_user)
			.then(function (response) {
				setThisUser(response.data.user);
				localStorage.setItem("token", response.data.token);
				return response;
			})
			.catch(function (error) {
				console.log("ERROR"); //TODO: ERROR HANDLING
			});

		setIsLoggedIn(true);
	}

	function logout() {
		setIsLoggedIn(false);
		setThisUser(null);
		localStorage.removeItem("token");
	}

	async function registerPostReq(
		email,
		username,
		firstName,
		lastName,
		password
	) {
		const REGISTER_URL = URL_BASE + "auth/register";
		const register_user = await {
			email: email,
			username: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
		};

		console.log(register_user);
		Axios.post(REGISTER_URL, register_user)
			.then(function (response) {
				setThisUser(response.data);
				localStorage.setItem("token", response.data.token);
				return response;
			})
			.catch(function (error) {
				console.log("ERROR"); //TODO: ERROR HANDLING
			});

		setIsLoggedIn(true);
	}

	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Navbar isLoggedIn={isLoggedIn} thisUser={thisUser} logout={logout} />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/Activity" element={<Activity />} />
						<Route path="/Exercise" element={<Exercise />} />
						<Route path="/Nutrition" element={<Nutrition />} />
						<Route path="/Sleep" element={<Sleep />} />
						<Route
							path="/Login"
							element={<LoginForm loginPostReq={loginPostReq} />}
						/>
						<Route
							path="/Register"
							element={<RegisterForm registerPostReq={registerPostReq} />}
						/>
					</Routes>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
