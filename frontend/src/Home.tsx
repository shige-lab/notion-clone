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
		newNote("Untitled");
	};
	useEffect(() => {
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
		});
	}, []);

	const selectNote = (SelectedNote: any) => {
		setNote(SelectedNote);
		console.log(SelectedNote.body);
		// console.log(SelectedNote.title);
		// console.log(SelectedNote.id);
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
		setNote({ id: newID, title: note.title, body: note.body });

	};
	const noteUpdate = (id: string, noteObj: any) => {
		console.log(noteObj.body);
		db.collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	const deleteNote = async (note: any) => {
		db.collection("notes").doc(note.id).delete();
		setNote({ id: "", title: "", body: "" });
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
