import * as React from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";

export default function RegisterForm(props) {
	return (
		<div className="register-form">
			<div class="card">
				<h2>Register</h2>
				<br />
				<div class="form">
					<div class="input-field">
						<label>Email</label>
						<input
							type="email"
							name="email"
							placeholder="Enter a valid email"
							value=""
						/>
					</div>
					<div class="input-field">
						<label>Username</label>
						<input
							type="text"
							name="username"
							placeholder="your_username"
							value=""
						/>
					</div>
					<div class="split-input-field">
						<div class="input-field">
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value=""
							/>
						</div>
						<div class="input-field">
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value=""
							/>
						</div>
					</div>
					<div class="input-field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder="Enter a secure password"
							value=""
						/>
					</div>
					<div class="input-field">
						<label>Confirm Password</label>
						<input
							type="password"
							name="passwordConfirm"
							placeholder="Confirm your password"
							value=""
						/>
					</div>
					<button class="btn">Create Account</button>
				</div>
				<div class="footer">
					<p>
						Already have an account? Login <Link to="/Login">here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
