import React, { useState } from "react";

export default function ForgotPassword() {
	const Host = "http://localhost:5000";
	const [Email, setEmail] = useState({
		email: "",
	});
	const [message, setmessage] = useState();
	const onChange = (e) => {
		setEmail({ ...Email, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${Host}/api/auth/forgetpassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: Email.email,
			}),
		});
		console.log(Email.email);
		const json = await response.json();
		console.log(json);
		setmessage(json.message);
	};

	return (
		<>
			<div className="container text-center">
				<h2>Forgot Password</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Email:</label>
						<input type="email" name="email" onChange={onChange} required />
					</div>

					<button type="submit">Reset Password</button>
				</form>
				<p>{message}</p>
			</div>
		</>
	);
}
