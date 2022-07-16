import * as React from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const navigate = useNavigate();

	function handleOnLogin(event) {
		event.preventDefault();
		setEmail("");
		setPassword("");
		navigate("/Activity");
		return props.loginPostReq(email, password);
	}

	return (
		<div className="login-form">
			<div className="card-login">
				<h2 className="login-title">Login</h2>
				<br />
				<div className="form">
					<div className="input-field">
						<input
							type="email"
							className="form__field"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(evt) => {
								setEmail(evt.target.value);
							}}
						/>
					</div>
					<div className="input-field">
						<input
							type="password"
							className="form__field"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(evt) => {
								setPassword(evt.target.value);
							}}
						/>
					</div>

					<button
						className="btn btn-slice"
						onClick={(event) => {
							handleOnLogin(event);
						}}
					>
						<div className="top">
							<span>Login</span>
						</div>
						<div className="bottom">
							<span>Login</span>
						</div>
					</button>
				</div>
				<div className="footer">
					<p>
						Don't have an account? Sign up <Link to="/register">here.</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
