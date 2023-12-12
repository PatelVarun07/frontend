import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function FullPageCard() {
	const [NewNote, setNewNote] = useState({
		title: "",
		description: "",
		tag: "",
	});
	const { id } = useParams();
	const Host = "http://localhost:5000";
	const AuthToken = JSON.parse(localStorage.getItem("token"));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const FetchIdNotes = async () => {
		const response = await fetch(
			`${Host}/api/notes/fetch-specific-note/${id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authtoken: AuthToken,
				},
			}
		);

		const json = await response.json();
		setNewNote(json)
		console.log(json);
	};
	useEffect(() => {
		FetchIdNotes();
	}, [FetchIdNotes]);

	return (
		<div className="container">
			{id}
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{NewNote.title}</h5>
					<p className="card-text">{NewNote.description}</p>
					<p className="card-text">{NewNote.tag}</p>
				</div>
			</div>
		</div>
	);
}
