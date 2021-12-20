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
	const [tests, setTests] = useState([{ _id: "", note: {title: "", body: ""}}]);
	const [test, setTest] = useState({ _id: "", note: {title: "", body: ""}});
	// const [test, setTest] = useState({});
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
			getNotes();
			});
	}, []);

	// const fetchAllUsers = () => {
	// 	getNotes()
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
		  await getNotes();
		
		// return await response.json();
	}

	const getNotes = async () => {
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
	  await setTests(Test);
	  console.log(tests[0].note.title)
	  console.log(Test[0].note.title)
	//   setTest(Test.note);
	//   setTest({...test, _id: Test._id});
	//   console.log(Test);
	//   console.log(tests);
	//   console.log(Test.note);
	//   console.log(Test.note.title);
	//   console.log(Test.note.body);


	// try{
        // const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`);
        // return await response.json();
    // }catch(error) {
    //     return [];
    // }
	}

	const update = async (_title: string, text: string) => {
		console.log("1");
		await fetch(`${process.env.REACT_APP_PUBLIC_API}/update`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({title: _title, body: text, id : test._id})
		})
		await setTest({...test, note : {title: _title, body: text }})
		console.log("2");
		getNotes();
		// return await response.json();
	}

const selectNote = (SelectedNote: any) => {
		setTest(SelectedNote);
		// console.log(SelectedNote.body);
		// console.log(SelectedNote.note.title);
		// console.log(SelectedNote.id);
	};

	const newNote = async (title: string) => {
		const note = {
			title,
			body: "",
			userId : userId,
		};
		const c = createUser(note);
			console.log(c);
	};
	const noteUpdate = (id: string, noteObj: any) => {
		console.log(noteObj.body);
		db.collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	const deleteNote = async (SelectedNote: any) => {
		setTest({ _id: "", note: {title: "", body: ""}});
		console.log(SelectedNote._id);
		await fetch(`${process.env.REACT_APP_PUBLIC_API}/delete`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({id : SelectedNote._id})
		})
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
						{tests.map((test) => (
							<div>
								{
									<Content
										note={test}
										selectNote={selectNote}
										deleteNote={deleteNote}
									/>
								}
							</div>
						))}
						{<List newNote={newNote} />}
					</div>
					<div className="Note">
						{test._id && (
							<EditorApp note={test} noteUpdate={update} />
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
