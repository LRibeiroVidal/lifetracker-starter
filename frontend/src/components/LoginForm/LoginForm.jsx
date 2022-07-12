import * as React from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
	return (
		<div className="login-form">
			<div className="card">
				<h2>Login</h2>
				<br />
				<div className="form">
					<div className="input-field">
						<label>Email</label>
						<input
							type="email"
							name="email"
							placeholder="user@gmail.com"
							value={props.email}
							onChange={(evt) => {
								props.setEmail(evt.target.value);
							}}
						/>
					</div>
					<div className="input-field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							value={props.password}
							onChange={(evt) => {
								props.setPassword(evt.target.value);
							}}
						/>
					</div>
					<button className="btn">Login</button>
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
