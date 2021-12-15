import React, { Fragment, useEffect, useState } from "react";
import firebase from "firebase";
import { auth, db } from "./src/firebase";
import "./Home.css";
import Content from "./src/Content";
import EditorApp from "./src/Editor";
import List from "./src/List";

const Home = (props: any) => {
	const [currentUser, setCurrentUser] = useState<null | object>(null);
	const [new_page, setNew_page] = useState(false);
	const [notes, setNotes] = useState([{ id: "", title: "", body: "" }]);

	// const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(Number);
	const [selectedNote, setSelectedNote] = useState([
		{ id: "", title: "", body: "" },
	]);

	const HandleOnclick = () => {
		setNew_page(true);
		console.log(new_page);
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
						body: "",
					}))
				);

				return () => unSub();
			});

			setNotes(notes);
			console.log(notes);
		});
	}, []);

	// const selectNote = (note, index) => {
	// 	setSelectedNote(note);
	// 	setSelectedNoteIndex(index);
	// };

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

		await setNotes(note);
		const newNoteIndex = notes.indexOf(
			notes.filter((_note) => _note.id === newID)[0]
		);

		setSelectedNote(notes[newNoteIndex]);
		setSelectedNoteIndex(newNoteIndex);
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
					<div className="list">
						list
						{notes.map((note) => (
							<h3>{note.title}</h3>
						))}
						{<List newNote={newNote} />}
					</div>
					<div className="contents">
						{new_page && <Content />}
						{new_page && <EditorApp />}
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
