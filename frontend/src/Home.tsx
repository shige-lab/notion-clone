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
	const [test, setTest] = useState({ _id: "", title: "", body: "" });
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

	// const fetchAllUsers = () => {
	// 	getUser()
	// 	  .then(note => {
	// 		console.log(note)
	// 		setTest(note);
	// 	  });
	//   }

	const createUser = async (data : any) => {
		const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			// body: JSON.stringify({user: data})
			body: JSON.stringify({note: data})
		  })
		return await response.json();
	}
	const getUser = async () => {
		console.log("3")
	const response = await fetch(
		`${process.env.REACT_APP_PUBLIC_API}/`,
		{
		  method: "GET",
		  credentials: "include",
		  // Forward the authentication cookie to the backend
		  headers: {
			"Content-Type": "application/json",
			// Cookie: req ? req.headers.cookie : undefined,
			// id: "61bf6a1996fda3d6d03a27bb",
		  },
		}
	  );
	  const Test = await response.json();
	  setTest(Test.note);
	  console.log(Test);
	  console.log(Test.note);
	  console.log(Test.note.title);
	  console.log(Test.note.body);


	// try{
        // const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`);
        // return await response.json();
    // }catch(error) {
    //     return [];
    // }
	}

	const selectNote = (SelectedNote: any) => {
		setNote(SelectedNote);
		// console.log(SelectedNote.body);
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
		// setNote({ id: newID, title: note.title, body: note.body });
		createUser(note);
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
						<button onClick={getUser}></button>
							<div>{test.title}</div>
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
