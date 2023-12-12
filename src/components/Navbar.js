import React from "react";
import { NavLink, Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();

	const LogOut = ()=>{
		localStorage.removeItem('token')
		navigate('/sign-up')
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Navbar
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about">
									about
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashbord">
									dashbord
								</NavLink>
							</li>
						</ul>
						{!localStorage.getItem("token") ? (
							<form>
								<NavLink to="/login" className="btn btn-primary mx-2">
									login
								</NavLink>
								<NavLink to="/sign-up" className="btn btn-primary mx-2">
									sgin up
								</NavLink>
							</form>
						) : (
							<button className="btn btn-primary mx-2" onClick={LogOut}>
								logout
							</button>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
