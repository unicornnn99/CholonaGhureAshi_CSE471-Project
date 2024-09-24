import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user._id) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(true);
		}
	}, [user]);

	return (
		<div className="navbar bg-base-100 flex justify px-4 bg-emerald-800">
			<div>
				<ul className="menu menu-horizontal px-1 flex justify">
					<li className="text-white font-bold">
						<NavLink to="/">Home</NavLink>
					</li>
					{!isLoggedIn ? (
						<li className="text-white font-bold">
							<NavLink to="/login">Login</NavLink>
						</li>
					) : (
						""
					)}
					{!isLoggedIn ? (
						<li className="text-white font-bold mr-14">
							<NavLink to="/register">Register</NavLink>
						</li>
					) : (
						""
					)}
					<div className="flex-none">
						<ul className="menu menu-horizontal px-1 flex justify mr-3">
                    	<li><NavLink className="text-white font-bold" to="/map">Map</NavLink></li>
                    	<li><NavLink className="text-white font-bold" to="/packages">Holiday Package</NavLink></li>
                    	<li><NavLink className="text-white font-bold" to="/rentals">Car Rental</NavLink></li>
                    	<li><NavLink className="text-white font-bold" to="/partners">Travel Partner</NavLink></li></ul>
					</div>
					{!isLoggedIn ? (
						<li className="text-white font-bold mr-14">
							<NavLink to="/ocr">Verification OCR</NavLink>{" "}
						</li>
					) : (
						""
					)}
					
					{isLoggedIn ? (
						<li className="text-white font-bold mr-3">
							<NavLink to="/profile">Profile</NavLink>
						</li>
					) : (
						""
					)}
					{isLoggedIn ? (
						<li className="text-white font-bold mr-3"><NavLink to="/showtrip">View Your Trips</NavLink></li>
					) : (
						""
					)}
					{isLoggedIn ? (
						<li><NavLink to="/trips" className="text-white font-bold mr-3">Create Your Trip</NavLink></li>
					) : (
						""
					)}
					{isLoggedIn ? (
						<li className="text-white font-bold mr-14">
							<NavLink
								onClick={() => {
									localStorage.removeItem("user");
								}}
								to="/logout"
							>
								Logout
							</NavLink>
						</li>
					) : (
						""
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
