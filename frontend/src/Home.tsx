import React, { Fragment, useEffect, useState } from "react";
import firebase from "firebase";
import { auth, db } from "./firebase";
import "./Home.css";
import Content from "./Content";
import EditorApp from "./Editor";
import List from "./CreateNote";

const Home = (props: any) => {
	const [currentUser, setCurrentUser] = useState<null | object>(null);
	const [notes, setNotes] = useState([{ id: "", title: "", body: "" }]);
	const [note, setNote] = useState({ id: "", title: "", body: "" });
	const [userId, setUserId] = useState<string | undefined>("");

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
			setUserId(user?.uid);

const unSub = db.collection("notes").where("userId", "==", user?.uid).onSnapshot((serverUpdate) => {
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

	const createUser = async (data : any) => {
		const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			// body: JSON.stringify({user: data})
			body: JSON.stringify({note: data})
		  })
		return await response.json();
	}

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
		const newFromDB = await db.collection("notes").add({
			userId : userId,
			title: note.title,
			body: note.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		const newID = newFromDB.id;

		await setNotes([{ id: newID, title: note.title, body: note.body }]);
		setNote({ id: newID, title: note.title, body: note.body });
	};
	const noteUpdate = (id: string, noteObj: any) => {
		console.log(noteObj.body);
		createUser(noteObj);
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
				<header className="HomeHeader">notion clone</header>
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
					<div className="Sidebar">
						list
						{notes.map((note, index) => (
							<div>
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
					<div className="Note">
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
