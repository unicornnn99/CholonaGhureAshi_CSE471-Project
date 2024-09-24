import React, { useEffect, useState } from "react";
import {NavLink, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/get-posts"
				);
				setPosts(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div 
        className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "url('..../images/bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
		<div className="bg-gray-100 min-h-screen p-8">
			<h1 className="text-4xl font-bold mb-8 text-center text-emerald-800">
				Cholona Ghure Ashi
			</h1>
			<main className="flex-grow p-6">
                <p className="text-emerald-950 text-lg font-bold leading-relaxed">
                    Welcome to Cholona Ghure Ashi, your ultimate gateway to unforgettable adventures! Whether you're dreaming of sun-soaked beaches, 
                    vibrant cityscapes, or serene mountain retreats, we're here to help you discover hidden gems and popular destinations alike. 
                    Join us as we embark on a journey to explore new cultures, savor delicious cuisines, and create memories that will last a lifetime. 
                    Let's turn your travel dreams into reality!
                </p>
            </main>
            <div className="flex justify-center mb-6">
                <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4">
                    <NavLink to="/locations" style={{ textDecoration: 'none', color: 'inherit' }}>View Destinations</NavLink>
                </button>

                <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 mr-4">
                    <NavLink to="/hotels" style={{ textDecoration: 'none', color: 'inherit' }}>View Hotels</NavLink>
                </button>
            </div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post) => (
					<Link
						key={post.post_id}
						to={`/post/${post.post_id}`}
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
					>
						<div className="flex items-center mb-4">
							{post.userPhotoURL ? (
								<img
									src={post.userPhotoURL}
									alt={post.userName}
									className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 mr-4"
								/>
							) : (
								<div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
									<span className="text-white text-xl font-semibold">
										{post.userName}
									</span>
								</div>
							)}
							<div>
								<h2 className="text-xl font-semibold text-gray-800">
									{post.userName}
								</h2>
							</div>
						</div>
						<h3 className="text-2xl font-semibold mb-4 text-indigo-700">
							{post.post_title}
						</h3>
					</Link>
				))}
			</div>
		</div>
		</div>
	);
};

export default Home;
