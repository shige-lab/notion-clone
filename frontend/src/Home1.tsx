import React, { Fragment, useEffect, useState } from "react";
import firebase from "firebase";
import { auth, db } from "./firebase";
import "./Home.css";
import Content from "./Content";
import EditorApp from "./Editor";
import List from "./List";

const Home = (props: any) => {
	const [currentUser, setCurrentUser] = useState<null | object>(null);
	const [new_page, setNew_page] = useState(false);
	const [notes, setNotes] = useState([{ id: "", title: "", body: "" }]);
	const [note, setNote] = useState({ id: "", title: "", body: "" });

	// const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);
	// const [selectedNoteIndex, setSelectedNoteIndex] = useState(Number);
	// const [selectedNote, setSelectedNote] = useState([
	// 	{ id: "", title: "", body: "" },
	// ]);

	const HandleOnclick = () => {
		// setNew_page(true);
		// console.log(new_page);
		newNote("Untitled");
	};
	useEffect(() => {
		// if not logged in, redirect to login page
		auth.onAuthStateChanged((user) => {
			user ? setCurrentUser(user) : props.history.push("/login");

			const unSub = db.collection("notes").onSnapshot((serverUpdate) => {
				setNotes(
					serverUpdate.docs.map((doc) => ({
						id: doc.id,
						title: doc.data().title,
						body: doc.data().body,
					}))
				);

				return () => unSub();
			});

			// setNotes(notes);
			// console.log(notes);
		});
	}, []);

	const selectNote = (SelectedNote: any) => {
		// console.log(note.title);
		setNote(SelectedNote);
		// setNote([
		// 	{
		// 		id: SelectedNote.id,
		// 		title: SelectedNote.title,
		// 		body: SelectedNote.body,
		// 	},
		// ]);
		// console.log(SelectedNote.body);
		// console.log(SelectedNote.title);
		// console.log(SelectedNote.id);
		// console.log(note["body"]);
		// console.log(note["title"]);
		// console.log(note.id);
	};

	const newNote = async (title: string) => {
		const note = {
			title,
			body: "",
		};
		const newFromDB = await firebase.firestore().collection("notes").add({
			title: note.title,
			body: note.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		const newID = newFromDB.id;
		// console.log(newID);

		await setNotes([{ id: newID, title: note.title, body: note.body }]);
		// const newNoteIndex = notes.indexOf(
		// 	notes.filter((_note) => _note.id === newID)[0]
		// );

		// setSelectedNote(notes[newNoteIndex]);
		// setSelectedNoteIndex(newNoteIndex);
	};
	const noteUpdate = (id: string, noteObj: any) => {
		console.log(noteObj.body);
		db.collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			// id: noteObj.id,
			// timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	const deleteNote = async (note: any) => {
		// await this.setState({
		// 	notes: this.state.notes.filter((_note) => _note !== note),
		// });

		// // const noteIndex = notes.indexOf(note);

		// if (selectedNoteIndex === noteIndex) {
		// 	this.deselectNote();
		// } else {
		// 	notes.length > 0
		// 		? this.selectNote(
		// 				notes[selectedNoteIndex - 1],
		// 				selectedNoteIndex - 1
		// 		  )
		// 		: this.deselectNote();
		// }

		db.collection("notes").doc(note.id).delete();
	};

	return (
		<Fragment>
			<div className="Home">
				<header className="Home_header">notion clone</header>
				<button
					className="Heme_logout"
					onClick={async (event) => {
						try {
							await auth.signOut();
							props.history.push("/login");
						} catch (error) {
							alert(error);
						}
					}}
					style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
				>
					Logout
				</button>
				<div className="Home_main">
					<div className="List">
						list
						{notes.map((note, index) => (
							<div>
								{" "}
								{
									<Content
										note={note}
										index={index}
										selectNote={selectNote}
										deleteNote={deleteNote}
									/>
								}
							</div>
						))}
						{<List newNote={newNote} />}
					</div>
					<div className="contents">
						{note.id && (
							<EditorApp note={note} noteUpdate={noteUpdate} />
						)}
					</div>
				</div>
				<button className="Home_newpage" onClick={HandleOnclick}>
					+ New Page
				</button>
			</div>
		</Fragment>
	);
};

export default Home;
