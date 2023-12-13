import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Host = "http://192.168.1.143:5001"
export default function SginUp() {
	const navigate = useNavigate();
	
	const [User, setUser] = useState({
		username: "",
		password: "",
		email: "",
	});
	const OnChange = (e) => {
		setUser({ ...User, [e.target.name]: e.target.value });
		// console.log(User);
	};
     const HandelSumbit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${Host}/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: User.username,
                    email: User.email,
				password: User.password,
			}),
		});

		const json = await response.json();
		console.log(json);
		if (json.success) {
			navigate("/one-time-password");
			localStorage.setItem("token", json.token) ;
		} else {
			alert(json.responce);
               // console.log(json)
		}
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
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						name="email"
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
						name="password" minLength={8}
					required/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
