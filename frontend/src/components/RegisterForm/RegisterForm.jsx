import * as React from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";

export default function RegisterForm(props) {
	const [email, setEmail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	function handleOnRegister(event) {
		event.preventDefault();
		setEmail("");
		setUsername("");
		setFirstName("");
		setLastName("");
		setPassword("");
		setConfirmPassword("");
		return props.registerPostReq(
			email,
			username,
			firstName,
			lastName,
			password
		);
	}

	return (
		<div className="register-form">
			<div className="card">
				<h2>Register</h2>
				<br />
				<div className="form">
					<div className="input-field">
						<div>Email</div>
						<input
							type="email"
							name="email"
							placeholder="Enter a valid email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<div>Username</div>
						<input
							type="text"
							name="username"
							placeholder="your_username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="split-input-field">
						<div className="input-field">
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="input-field">
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="input-field">
						<div>Password</div>
						<input
							type="password"
							name="password"
							placeholder="Enter a secure password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<div>
							Confirm Password{" "}
							<span
								className={
									!(password == confirmPassword)
										? "passwordCheck"
										: "passwordCheck hidden"
								}
								style={{ color: "red" }}
							>
								- Passwords must match -
							</span>
						</div>
						<input
							type="password"
							name="passwordConfirm"
							placeholder="Confirm your password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
					<button
						className="btn"
						disabled={!(password == confirmPassword) || password == ""}
						onClick={(evt) => {
							handleOnRegister(evt);
						}}
					>
						Create Account
					</button>
				</div>
				<div className="footer">
					<p>
						Already have an account? Login <Link to="/Login">here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
