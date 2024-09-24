import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from './Pages/home.jsx';
import Login from "./Pages/Authentication/Login";
import Layout from "./Layout/Layout";
import Registration from "./Pages/Authentication/Registration";
import AuthOCR from "./Pages/Authentication/AuthOCR";
import AuthProvider from "./Pages/Authentication/AuthProvider";
import Friends from "./Pages/Friends/Friends";
import CreatePage from "./Pages/Create/CreatePage";
import Hotels from './Pages/showHotels.jsx';
import Locations from './Pages/showLocations.jsx';
import Trip from './Pages/createTrip.jsx';
import ShowTrips from './Pages/showTrip.jsx';
import BookHotel from "./Pages/bookHotel.jsx";
import CarRentals from "./Pages/CarRentals.jsx";
import HolidayPackage from "./Pages/HolidayPackage.jsx";
import MapPage from "./Pages/MapPage.jsx";
import TravelPartners from "./Pages/TravelPartners.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/ocr",
				element: <AuthOCR></AuthOCR>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Registration></Registration>,
			},
			{
				path: "/friends",
				element: <Friends></Friends>,
			},
			{
				path: "/create",
				element: <CreatePage></CreatePage>,
			},
			{
				path: "/trips",
				element: <Trip />
			},
			{
				path:'/locations',
				element: <Locations />
			},
			{
				path:'/hotels',
				element: <Hotels />
			},
			{
				path:'/bookHotel/:id',
				element: <BookHotel />
			},
			{
				path:'/showtrip',
				element: <ShowTrips />
			},
			{
				path:'/rentals',
				element: <CarRentals />
			},
			{
				path:'/rentals/:id',
				element: <CarRentals />
			},
			{
				path:'/packages',
				element: <HolidayPackage />
			},
			{
				path:'/packages/:id',
				element: <HolidayPackage />
			},
			{
				path:'/partners',
				element: <TravelPartners />
			},
			{
				path:'/partners/:id',
				element: <TravelPartners />
			},
			{
				path:'/map',
				element: <MapPage />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
