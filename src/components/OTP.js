import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP() {
     const AuthToken = localStorage.getItem("token");
	const navigateTo = useNavigate();
	const [OTP, setOtp] = useState({
		otp: "",
	});
	// const Host = "http://localhost:5000";
     console.log({ AuthToken });
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:5001/api/auth/emailverification`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authtoken: AuthToken,
			},
			body: JSON.stringify({
				"token": OTP.otp,
			}),
		});

		const json = await response.json();
		console.log(json.success);
		if(json.success){
		     // console.log(json);
		navigateTo("/");
		}
		// else{
		//      alert('try to login with correct crdentional')
		// }
	};
	const handleChange = (e) => {
		setOtp({ ...OTP, [e.target.name]: e.target.value });
		console.log(OTP);
	};
	

	console.log("Submitted OTP:", OTP.otp);
	return (
		<>
			<div className="container text-center m-5">
				<h2>Enter OTP</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="number"
						maxLength="6"
						onChange={handleChange}
						placeholder="Enter OTP"
						name="otp"
					/>

					<button type="submit">Submit</button>
				</form>
				<p className={OTP.otp.length > 4 ? "show" : "disable"}>
					otp can not be more then 4 letter
				</p>
			</div>
		</>
	);
}

export default OTP;
