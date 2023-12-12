import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import FullPageCard from './components/FullPageCard';
import Login from './components/Login';
import SginUp from './components/SginUp';
import OTP from './components/OTP';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
		<NoteState>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Detail-page/:id" element={<FullPageCard/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/sign-up" element={<SginUp/>} />
					<Route path="/one-time-password" element={<OTP/>} />
					<Route path="/forgot-password" element={<ForgotPassword/>} />
					<Route path="/reset-password" element={<ResetPassword/>} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</NoteState>
	);
}

// You can think of these components as "pages"
// in your app.





function Error() {
  return (
    <div className='text-center'>
    <span data-heading="404">404</span> 
      <h2>page not found </h2>
    </div>
  );
}

