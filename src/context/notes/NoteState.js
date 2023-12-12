import React, { useState ,  } from "react";
import NoteContext from "./noteContext";
// import { useNavigate } from "react-router-dom";
const AuthToken = localStorage.getItem("token");
const Host = "http://localhost:5001"
const NoteState = ({ children }) => {
	// const navigate = useNavigate();
	
	const notesInitial = [];

	const [notes, setNotes] = useState(notesInitial);
	
	const FetchNotes = async (NewAuthToken) => {
		const response = await fetch(`http://localhost:5001/api/notes/fetchnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authtoken: NewAuthToken
			},
		});

		const json = await response.json();
		
		setNotes(json);
	};

	const AddNote = async ( formdata ) => {
		console.log(formdata)
		const response = await fetch(`${Host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				
				authtoken: AuthToken
			},
			body:formdata
				
			
		});
		FetchNotes(AuthToken)

		// const note = response;
		console.log(response)
		// setNotes(notes.concat(note));
	};
	const DeleteNote = async (id ) => {
		const response = await fetch(
			`${Host}/api/notes/deletenote/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authtoken: AuthToken
				},
			}
		);

		// eslint-disable-next-line no-unused-vars
		const json = response.json();

		const DelNote = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(DelNote);
	};
	const EditNote = async (id, formdata ) => {
		console.log ( id , formdata)
		const response = await fetch(
			`${Host}/api/notes/update/${id}`,
			{
				method: "PUT",
				headers: {
					
					authtoken: AuthToken
				},
				body: formdata,
			}
		);
		FetchNotes(AuthToken)
		// eslint-disable-next-line no-unused-vars
		const json = await response.json();
		console.log(json)
		// let NewNote = JSON.parse(JSON.stringify(notes));
		// for (let index = 0; index < NewNote.length; index++) {
		// 	const element = NewNote[index];
		// 	if (element._id === id) {
		// 		NewNote[index].title = formdata.title;
		// 		NewNote[index].description = formdata.description;
		// 		NewNote[index].tag = formdata.tag;
		// 		break;
		// 	}
		// }
		// setNotes(NewNote);
	};
	return (
		<NoteContext.Provider
			value={{ notes, AddNote, DeleteNote, EditNote, FetchNotes }}>
			{children}
		</NoteContext.Provider>
	);
};
export default NoteState;
