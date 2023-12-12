import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Host = "http://192.168.1.143:5001";
export default function Login() {
	const navigate = useNavigate();

	
	const [User, setUser] = useState({
		username: "",
		password: "",
	});

	const HandelSumbit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${Host}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: User.username,
				password: User.password,
			}),
		});

		const json = await response.json();
		console.log(json);
		if (json.success) {
			localStorage.setItem("token",json.token);
			// console.log(json);
			navigate("/");
		} else {
			alert("try to login with correct crdentional");
		}
	};
	const OnChange = (e) => {
		setUser({ ...User, [e.target.name]: e.target.value });
		// console.log(User)
	};

	return (
		<div className=" container m-5 p-5">
			<form onSubmit={HandelSumbit}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						aria-describedby="emailHelp"
						name="username"
						onChange={OnChange}
					/>
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						onChange={OnChange}
						name="password"
					/>
					<NavLink to="/forgot-password">forgot password</NavLink>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
