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
	const [allExercises, setAllExercises] = React.useState("");
	const config = {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	};

	React.useEffect(() => {
		console.log("hot update");
		if (thisUser) getExercises(thisUser.id);
	}, [thisUser]);

	async function loginPostReq(email, password) {
		const LOGIN_URL = URL_BASE + "auth/login";
		const login_user = await { email: email, password: password };

		Axios.post(LOGIN_URL, login_user)
			.then(function (response) {
				setThisUser(response.data.user);
				localStorage.setItem("token", response.data.token);
				setIsLoggedIn(true);

				return response;
			})
			.catch(function (error) {
				console.log("ERROR ", error); //TODO: ERROR HANDLING
			});
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

		Axios.post(REGISTER_URL, register_user)
			.then(function (response) {
				setThisUser(response.data.user);
				localStorage.setItem("token", response.data.token);
				setIsLoggedIn(true);

				return response;
			})
			.catch(function (error) {
				console.log("ERROR ", error); //TODO: ERROR HANDLING
			});
	}

	async function addExercisePostRequest(name, category, duration, intensity) {
		const ADDEXERCISE_URL = URL_BASE + "tracker/addExercise";
		const exerciseAdded = {
			name: name,
			category: category,
			duration: duration,
			intensity: intensity,
			user_id: thisUser.id,
		};
		Axios.post(ADDEXERCISE_URL, exerciseAdded, config)
			.then(function (response) {
				console.log("SUCCESS ", response);
				setAllExercises(response.data.rows);
				return response.data;
			})
			.catch(function (error) {
				console.log("ERROR ", error); //TODO: ERROR HANDLING
			});
	}

	async function getExercises(user_id) {
		let id_user = { user_id: user_id };
		const GETEXERCISE_URL = URL_BASE + "tracker/getExercises";
		Axios.post(GETEXERCISE_URL, id_user, config)
			.then(function (response) {
				console.log("HERE HERE HERE ", response.data.rows);
				setAllExercises(response.data.rows);
				return response.data;
			})
			.catch(function (error) {
				console.log("ERROR ", error); //TODO: ERROR HANDLING
			});
	}

	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Navbar
						isLoggedIn={isLoggedIn}
						thisUser={thisUser}
						logout={logout}
						setAllExercises={setAllExercises}
						getExercises={getExercises}
					/>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/Activity" element={<Activity />} />
						<Route
							path="/Exercise"
							element={
								<Exercise
									addExercise={addExercisePostRequest}
									allExercises={allExercises}
									setAllExercises={setAllExercises}
									getExercises={getExercises}
									thisUser={thisUser}
								/>
							}
						/>
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
