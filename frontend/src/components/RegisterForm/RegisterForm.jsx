import * as React from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm(props) {
	const [email, setEmail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const navigate = useNavigate();

	function handleOnRegister(event) {
		event.preventDefault();
		setEmail("");
		setUsername("");
		setFirstName("");
		setLastName("");
		setPassword("");
		setConfirmPassword("");
		navigate("/Activity");
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
			<div className="register-card">
				<h2 className="register-title">Register</h2>
				<br />
				<div className="form">
					<div className="input-field">
						<input
							type="email"
							name="email"
							className="form__field"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<input
							type="text"
							name="username"
							className="form__field"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="split-input-field">
						<div className="input-field input-reg-names">
							<input
								type="text"
								className="form__field"
								name="firstName"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="input-field input-reg-names">
							<input
								type="text"
								name="lastName"
								className="form__field"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="input-field">
						<input
							type="password"
							className="form__field"
							name="password"
							placeholder="Enter a secure password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<div>
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
							className="form__field"
							placeholder="Confirm your password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
					<button
						className="btn btn-slice"
						disabled={!(password == confirmPassword) || password == ""}
						onClick={(evt) => {
							handleOnRegister(evt);
						}}
					>
						<div class="top">
							<span>Create Account</span>
						</div>
						<div class="bottom">
							<span>Create Account</span>
						</div>
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
