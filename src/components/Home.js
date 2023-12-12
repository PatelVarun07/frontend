import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
	const Host = "http://localhost:5001";
	const AuthToken = localStorage.getItem("token");
	const context = useContext(noteContext);
	const [UserInfo, setUserInfo] = useState({
		username: "",
		verification: "",
	});
	const { notes, AddNote, DeleteNote, EditNote, FetchNotes } = context;
	const [TitleImage, setTitleImage] = useState();
	const [GaleryImage, setGaleryImage] = useState();
	const [NewNote, setNewNote] = useState({
		title: "",
		discription: "",
		tags: "",
	});
	const [EditedNote, setEditedNote] = useState({
		id: "",
		etitle: "",
		edescription: "",
		etags: "",
	});
	const onChange = (e) => {
		setNewNote({ ...NewNote, [e.target.name]: e.target.value });

		console.log(NewNote);
	};
	const onChangeimg = (e) => {
		console.log(e.target.files[0]);
		setTitleImage(e.target.files[0]);
	};
	const onChangeimgTwo = (e) => {
		console.log(e.target.files);
		setGaleryImage(e.target.files);
	};
	const OnClick = (e) => {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append("TitleImage", TitleImage);
		
		formdata.append("title", NewNote.title);
		formdata.append("description", NewNote.discription);
		formdata.append("tags", NewNote.tags);

		for (const file of GaleryImage) {
			formdata.append("GaleryImage", file);
		}

		AddNote(formdata);
	};

	const navigate = useNavigate();

	const Close = () => {
		const Modal = document.querySelector("#Modal");
		Modal.classList.toggle("hidden");
	};
	const UpdateNote = (data) => {
		// console.log(data)
		const Modal = document.querySelector("#Modal");
		Modal.classList.toggle("hidden");
		setEditedNote({
			id: data._id,
			etitle: data.title,
			edescription: data.description,
			etags: data.tag,
		});
	};
	const onChange1 = (e) => {
		setEditedNote({ ...EditedNote, [e.target.name]: e.target.value });
	};
	const OnClickEdit = (e) => {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append("TitleImage", TitleImage);
		
		formdata.append('etitle' ,EditedNote.etitle)
		formdata.append('edescription' ,EditedNote.edescription)
		formdata.append('etags' ,EditedNote.etags)
		
		if(GaleryImage){

			for (const file of GaleryImage) {
				formdata.append("GaleryImage", file);
			}
		}
		EditNote(
			EditedNote.id,
			formdata
		);
		const Modal = document.querySelector("#Modal");
		Modal.classList.toggle("hidden");
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const CheckUser = async (e) => {
		const response = await fetch(`${Host}/api/auth/getuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authtoken: AuthToken,
			},
		});
		let json = await response.json();
		// console.log(json);
		setUserInfo({
			username: json.username,
			verification: json.verification,
		});
	};
	useEffect(() => {
		if (AuthToken) {
			FetchNotes(AuthToken);
			CheckUser();
		} else {
			navigate("/sign-up");
		}
	}, []);

	return (
		<>
			<h1 className="text-center mt-5">{UserInfo.username}</h1>
			<div className="modal-1 hidden" id="Modal">
				<div className="inner-html">
					<form className="row g-3">
						<div className="col-md-4">
							<label htmlFor="ETitle" className="form-label">
								Title
							</label>
							<input
								type="text"
								className="form-control"
								id="ETitle"
								name="etitle"
								onChange={onChange1}
								value={EditedNote.etitle}
								required
							/>
						</div>
						<div className="col-md-4">
							<label htmlFor="ETags" className="form-label">
								Tags
							</label>
							<input
								type="text"
								className="form-control"
								id="ETags"
								name="etags"
								onChange={onChange1}
								value={EditedNote.etags}
								required
							/>
						</div>

						<div className="col-md-6">
							<label htmlFor="EDiscription" className="form-label">
								Discription
							</label>
							<input
								name="edescription"
								type="text"
								className="form-control"
								id="EDiscription"
								onChange={onChange1}
								value={EditedNote.edescription}
								required
							/>
						</div>
						<div className="col-12">
						<label htmlFor="Discription" className="form-label">
							title image
						</label>
						<input
							name="TitleImage"
							type="file"
							className="form-control"
							id="Discription"
							onChange={onChangeimg}
							required
						/>
						</div>
						<div className="col-12">
						<label htmlFor="Discription" className="form-label">
							Galery Image
						</label>
						<input
							name="GaleryImage"
							type="file"
							className="form-control"
							id="Discription"
							onChange={onChangeimgTwo}
							required
							multiple
						/>
						</div>
						<div className="col-12">
							<button
								className="btn btn-primary"
								type="submit"
								onClick={OnClickEdit}>
								Submit form
							</button>
						</div>
						<div className="col-12">
							<button
								disabled={
									EditedNote.etitle.length < 5 ||
									EditedNote.edescription.length < 5
								}
								className="btn btn-primary"
								type="button"
								onClick={Close}>
								close
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="container mt-5">
				<form className="row g-3">
					<div className="col-md-4">
						<label htmlFor="Title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control"
							id="Title"
							name="title"
							onChange={onChange}
							required
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="Tags" className="form-label">
							Tags
						</label>
						<input
							type="text"
							className="form-control"
							id="Tags"
							name="tags"
							onChange={onChange}
							required
						/>
					</div>

					<div className="col-md-6">
						<label htmlFor="Discription" className="form-label">
							Discription
						</label>
						<input
							name="discription"
							type="text"
							className="form-control"
							id="Discription"
							onChange={onChange}
							required
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="Discription" className="form-label">
							title image
						</label>
						<input
							name="TitleImage"
							type="file"
							className="form-control"
							id="Discription"
							onChange={onChangeimg}
							required
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="Discription" className="form-label">
							Galery Image
						</label>
						<input
							name="GaleryImage"
							type="file"
							className="form-control"
							id="Discription"
							onChange={onChangeimgTwo}
							required
							multiple
						/>
					</div>
					<div className="col-12">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="invalidCheck2"
								required
							/>
							<label className="form-check-label" htmlFor="invalidCheck2">
								Agree to terms and conditions
							</label>
						</div>
					</div>
					<div className="col-12">
						<button
							disabled={
								NewNote.title.length < 5 || NewNote.discription.length < 5
							}
							className="btn btn-primary"
							type="submit"
							onClick={OnClick}>
							Submit form
						</button>
					</div>
				</form>
			</div>
			<div className="container mt-5">
				<div className="notes-section">
					<div className="row">
						{notes.map((note) => {
							return (
								<div className="col-md-4 p-4" key={note._id}>
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">{note.title}</h5>
											<p className="card-text">{note.description}</p>
											<p className="card-text">title image</p>
											
											<div
												className=""
												style={{
													width: "200px",
													height: "200px",
													overflow: "hidden",
												}}>
												<img
													className="w-100 h-100"
													src={`${note.TitleImage}`}
													alt=""
												/>
											</div>
											<p className="card-text">galary image</p>
											{note.GaleryImage.map((path)=>{
												return (
													<div
												className="" key={path}
												style={{
													width: "200px",
													height: "200px",
													overflow: "hidden",
												}}>
												<img
													className="w-100 h-100"
													src={`${path}`}
													alt=""
												/>
											</div>
												)
											})}
											 

											<Link
												href="#"
												className="btn btn-primary"
												to={`/Detail-page/${note._id}`}>
												Go somewhere
											</Link>
											<button
												onClick={() => {
													DeleteNote(note._id);
												}}>
												delete
											</button>
											<button onClick={() => UpdateNote(note)}>update</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
